<?php
function get_brands1($cat = 0, $app = 'brand')
{
    $children = ($cat > 0) ? ' AND ' . get_children($cat) : '';

    $sql = "SELECT b.brand_id, b.brand_name, b.brand_logo, b.brand_desc, COUNT(*) AS goods_num, IF(b.brand_logo > '', '1', '0') AS tag ".
            "FROM " . $GLOBALS['ecs']->table('brand') . "AS b, ".
                $GLOBALS['ecs']->table('goods') . " AS g ".
            "WHERE g.brand_id = b.brand_id $children AND is_show = 1 " .
            " AND g.is_on_sale = 1 AND g.is_alone_sale = 1 AND g.is_delete = 0 ".
            "GROUP BY b.brand_id HAVING goods_num > 0 ORDER BY tag DESC, b.sort_order ASC";
    $row = $GLOBALS['db']->getAll($sql);

    foreach ($row AS $key => $val)
    {
        $row[$key]['url'] = build_uri($app, array('cid' => $cat, 'bid' => $val['brand_id']), $val['brand_name']);
        $row[$key]['brand_desc'] = htmlspecialchars($val['brand_desc'],ENT_QUOTES);
    }

    return $row;
}
//
function get_promotion_info1($goods_id = '')
{
    $snatch = array();
    $group = array();
    $auction = array();
    $package = array();
    $favourable = array();

    $gmtime = gmtime();
    $sql = 'SELECT act_id, act_name, act_type, start_time, end_time FROM ' . $GLOBALS['ecs']->table('goods_activity') . " WHERE is_finished=0 AND start_time <= '$gmtime' AND end_time >= '$gmtime'";
    if(!empty($goods_id))
    {
        $sql .= " AND goods_id = '$goods_id'";
    }
    $res = $GLOBALS['db']->getAll($sql);
    foreach ($res as $data)
    {
        switch ($data['act_type'])
        {
            case GAT_SNATCH: //夺宝奇兵
                $snatch[$data['act_id']]['act_name'] = $data['act_name'];
                $snatch[$data['act_id']]['url'] = build_uri('snatch', array('sid' => $data['act_id']));
                $snatch[$data['act_id']]['time'] = sprintf($GLOBALS['_LANG']['promotion_time'], local_date('Y-m-d', $data['start_time']), local_date('Y-m-d', $data['end_time']));
                $snatch[$data['act_id']]['sort'] = $data['start_time'];
                $snatch[$data['act_id']]['type'] = 'snatch';
                break;

            case GAT_GROUP_BUY: //团购
                $group[$data['act_id']]['act_name'] = $data['act_name'];
                $group[$data['act_id']]['url'] = build_uri('group_buy', array('gbid' => $data['act_id']));
                $group[$data['act_id']]['time'] = sprintf($GLOBALS['_LANG']['promotion_time'], local_date('Y-m-d', $data['start_time']), local_date('Y-m-d', $data['end_time']));
                $group[$data['act_id']]['sort'] = $data['start_time'];
                $group[$data['act_id']]['type'] = 'group_buy';
                break;

            case GAT_AUCTION: //拍卖
                $auction[$data['act_id']]['act_name'] = $data['act_name'];
                $auction[$data['act_id']]['url'] = build_uri('auction', array('auid' => $data['act_id']));
                $auction[$data['act_id']]['time'] = sprintf($GLOBALS['_LANG']['promotion_time'], local_date('Y-m-d', $data['start_time']), local_date('Y-m-d', $data['end_time']));
                $auction[$data['act_id']]['sort'] = $data['start_time'];
                $auction[$data['act_id']]['type'] = 'auction';
                break;

            case GAT_PACKAGE: //礼包
                $package[$data['act_id']]['act_name'] = $data['act_name'];
                $package[$data['act_id']]['url'] = 'package.php#' . $data['act_id'];
                $package[$data['act_id']]['time'] = sprintf($GLOBALS['_LANG']['promotion_time'], local_date('Y-m-d', $data['start_time']), local_date('Y-m-d', $data['end_time']));
                $package[$data['act_id']]['sort'] = $data['start_time'];
                $package[$data['act_id']]['type'] = 'package';

                break;
        }
    }

    $user_rank = ',' . $_SESSION['user_rank'] . ',';
    $favourable = array();
    $sql = 'SELECT act_id, act_range, act_range_ext, act_name, start_time, end_time FROM ' . $GLOBALS['ecs']->table('favourable_activity') . " WHERE start_time <= '$gmtime' AND end_time >= '$gmtime'";
    if(!empty($goods_id))
    {
        $sql .= " AND CONCAT(',', user_rank, ',') LIKE '%" . $user_rank . "%'";
    }
    $res = $GLOBALS['db']->getAll($sql);

    if(empty($goods_id))
    {
        foreach ($res as $rows)
        {
            $favourable[$rows['act_id']]['act_name'] = $rows['act_name'];
            $favourable[$rows['act_id']]['url'] = 'activity.php';
            $favourable[$rows['act_id']]['time'] = sprintf($GLOBALS['_LANG']['promotion_time'], local_date('Y-m-d', $rows['start_time']), local_date('Y-m-d', $rows['end_time']));
            $favourable[$rows['act_id']]['sort'] = $rows['start_time'];
            $favourable[$rows['act_id']]['type'] = 'favourable';
        }
    }
    else
    {
        $sql = "SELECT cat_id, brand_id FROM " . $GLOBALS['ecs']->table('goods') .
           "WHERE goods_id = '$goods_id'";
        $row = $GLOBALS['db']->getRow($sql);
        $category_id = $row['cat_id'];
        $brand_id = $row['brand_id'];

        foreach ($res as $rows)
        {
            if ($rows['act_range'] == FAR_ALL)
            {
                $favourable[$rows['act_id']]['act_name'] = $rows['act_name'];
                $favourable[$rows['act_id']]['url'] = 'activity.php';
                $favourable[$rows['act_id']]['time'] = sprintf($GLOBALS['_LANG']['promotion_time'], local_date('Y-m-d', $rows['start_time']), local_date('Y-m-d', $rows['end_time']));
                $favourable[$rows['act_id']]['sort'] = $rows['start_time'];
                $favourable[$rows['act_id']]['type'] = 'favourable';
            }
            elseif ($rows['act_range'] == FAR_CATEGORY)
            {
                /* 找出分类id的子分类id */
                $id_list = array();
                $raw_id_list = explode(',', $rows['act_range_ext']);
                foreach ($raw_id_list as $id)
                {
                    $id_list = array_merge($id_list, array_keys(cat_list($id, 0, false)));
                }
                $ids = join(',', array_unique($id_list));

                if (strpos(',' . $ids . ',', ',' . $category_id . ',') !== false)
                {
                    $favourable[$rows['act_id']]['act_name'] = $rows['act_name'];
                    $favourable[$rows['act_id']]['url'] = 'activity.php';
                    $favourable[$rows['act_id']]['time'] = sprintf($GLOBALS['_LANG']['promotion_time'], local_date('Y-m-d', $rows['start_time']), local_date('Y-m-d', $rows['end_time']));
                    $favourable[$rows['act_id']]['sort'] = $rows['start_time'];
                    $favourable[$rows['act_id']]['type'] = 'favourable';
                }
            }
            elseif ($rows['act_range'] == FAR_BRAND)
            {
                if (strpos(',' . $rows['act_range_ext'] . ',', ',' . $brand_id . ',') !== false)
                {
                    $favourable[$rows['act_id']]['act_name'] = $rows['act_name'];
                    $favourable[$rows['act_id']]['url'] = 'activity.php';
                    $favourable[$rows['act_id']]['time'] = sprintf($GLOBALS['_LANG']['promotion_time'], local_date('Y-m-d', $rows['start_time']), local_date('Y-m-d', $rows['end_time']));
                    $favourable[$rows['act_id']]['sort'] = $rows['start_time'];
                    $favourable[$rows['act_id']]['type'] = 'favourable';
                }
            }
            elseif ($rows['act_range'] == FAR_GOODS)
            {
                if (strpos(',' . $rows['act_range_ext'] . ',', ',' . $goods_id . ',') !== false)
                {
                    $favourable[$rows['act_id']]['act_name'] = $rows['act_name'];
                    $favourable[$rows['act_id']]['url'] = 'activity.php';
                    $favourable[$rows['act_id']]['time'] = sprintf($GLOBALS['_LANG']['promotion_time'], local_date('Y-m-d', $rows['start_time']), local_date('Y-m-d', $rows['end_time']));
                    $favourable[$rows['act_id']]['sort'] = $rows['start_time'];
                    $favourable[$rows['act_id']]['type'] = 'favourable';
                }
            }
        }
    }

    $sort_time = array();
    $arr = array_merge($snatch, $group, $auction, $package, $favourable);
    foreach($arr as $key => $value)
    {
        $sort_time[] = $value['sort'];
    }
    array_multisort($sort_time, SORT_NUMERIC, SORT_DESC, $arr);

    return $arr;
}
$this->assign('promotion_info1', get_promotion_info1());
?>
<?php echo $this->fetch('library/user_header.lbi'); ?> 
<div id="header">
  <div class="headerLayout">
    <div class="headerCon ">
      <h1 id="mallLogo" class="mall-logo"> 
     	<!-- <a href="#" class="header-logo" title="logo"><img src="themes/68ecshopcom_360buy/images/header/logo.jpg" /></a> -->
      </h1>
      <div class="header-extra">
        <?php echo $this->fetch('library/user_header_right.lbi'); ?> 
        <script src="themes/68ecshopcom_360buy/images/page.js" type="text/javascript"></script>  
        <div id="mallSearch" class="mall-search" style="position:relative; z-index:999999999; overflow:visible;">
        <div id="search_tips" style="display:none;"></div>
          <ul class="search-type clearfix">
          	<li <?php if ($_REQUEST['type'] == 0): ?>class="cur"<?php endif; ?> num="0">宝贝</li>
          	<li <?php if ($_REQUEST['type'] == 1): ?>class="cur"<?php endif; ?> num="1">店铺</li>
          </ul>	 
          <form class="mallSearch-form" method="get" name="searchForm" id="searchForm" action="search.php" onSubmit="return checkSearchForm()">
	   		<input type='hidden' name='type' id="searchtype" value="<?php echo empty($_REQUEST['type']) ? '0' : $_REQUEST['type']; ?>">
            <fieldset>
              <legend>搜索</legend>
              <div class="mallSearch-input clearfix">
                <div id="s-combobox-135" class="s-combobox">
                  <div class="s-combobox-input-wrap">
                    <input aria-haspopup="true" role="combobox" class="s-combobox-input" name="keywords" id="keyword" tabindex="9" accesskey="s" onkeyup="STip(this.value, event);" autocomplete="off"  value="<?php if ($this->_var['search_keywords']): ?><?php echo htmlspecialchars($this->_var['search_keywords']); ?><?php else: ?>请输入关键词<?php endif; ?>" onFocus="if(this.value=='请输入关键词'){this.value='';}else{this.value=this.value;}" onBlur="if(this.value=='')this.value='请输入关键词'" type="text">
                  </div>
                </div>
                <input type="submit" value="搜索" class="button"  >
              </div>
            </fieldset>
          </form>
          <ul class="hot-query" >
          <?php $_from = $this->_var['searchkeywords']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'val');$this->_foreach['name'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['name']['total'] > 0):
    foreach ($_from AS $this->_var['val']):
        $this->_foreach['name']['iteration']++;
?>
          	<li <?php if (($this->_foreach['name']['iteration'] <= 1)): ?>style="border-left: none;"<?php endif; ?>>
            	<a href="search.php?keywords=<?php echo urlencode($this->_var['val']); ?>" title="<?php echo $this->_var['val']; ?>"><?php echo $this->_var['val']; ?></a>
            </li>
          <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>            
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="globa-nav">
  <div class="w">
  	<div class="allGoodsCat Left" > 
    	<a href="catalog.php" class="menuEvent" title="查看全部商品分类"><strong class="catName">全部商品分类</strong><i></i></a>
   </div>
   <?php echo $this->fetch('library/head_nav.lbi'); ?>
  </div>
</div>
<script type="text/javascript">function _show_(h,b){if(!h){return;}if(b&&b.source&&b.target){var d=(typeof b.source=="string")?M.$("#"+b.source):b.source;var e=(typeof b.target=="string")?M.$("#"+b.target):b.target;if(d&&e&&!e.isDone){e.innerHTML=d.value;d.parentNode.removeChild(d);if(typeof b.callback=="function"){b.callback();}e.isDone=true;}}M.addClass(h,"hover");if(b&&b.isLazyLoad&&h.isDone){var g=h.find("img");for(var a=0,c=g.length;a<c;a++){var f=g[a].getAttribute("data-src_index_menu");if(f){g[a].setAttribute("src",f);g[a].removeAttribute("data-src_index_menu");}}h.isDone=true;}}function _hide_(a){if(!a){return;}if(a.className.indexOf("hover")>-1){M.removeClass(a,"hover");}}</script>
<div class="w">
	<div class="all_cat" style="background: #ffffff;filter: alpha(Opacity=80);background-color: rgba(255,255,255,.8);">
		<?php echo $this->fetch('library/header_tan.lbi'); ?>
	</div>
</div>
<script type="text/javascript">
//<![CDATA[

function checkSearchForm()
{
    if(document.getElementById('keyword').value)
    {
	var frm  = document.getElementById('searchForm');
	var type = parseInt(document.getElementById('searchtype').value);
	frm.action = type==0 ? 'search.php' : 'stores.php';
        return true;
    }
    else
    {
	alert("请输入关键词！");
        return false;
    }
}

function myValue1()
{
	document.getElementById('keyword').value = "请输入商品名称或编号...";
}

function myValue2()
{
	document.getElementById('keyword').value = "";
}

//]]>
</script>
<div class="blank10"></div>
<script>
/* *
 * 清除购物车购买商品数量
 */
function delet(rec_id)
{
	var formBuy      = document.forms['formCart'];
	var domname='goods_number_'+rec_id;
	var attr = getSelectedAttributes(document.forms['formCart']);
	var qty = parseInt(document.getElementById(domname).innerHTML)==0;
	Ajax.call('flow.php', 'step=price&rec_id=' + rec_id + '&number=' + qty, changecartPriceResponse, 'GET', 'JSON');
}			
/* *
 * 增加购物车购买商品数量
 */
function addcartnum(rec_id)
{
  var attr = getSelectedAttributes(document.forms['formCart']);
  var domname='goods_number_'+rec_id;
  var qty = parseInt(document.getElementById(domname).innerHTML)+1;
  Ajax.call('flow.php', 'step=price&rec_id=' + rec_id + '&number=' + qty, changecartPriceResponse, 'GET', 'JSON');
}
/* *
 * 减少购买商品数量
 */
function lesscartnum(rec_id)
{
    var formBuy      = document.forms['formCart'];
	var domname='goods_number_'+rec_id;
	var attr = getSelectedAttributes(document.forms['formCart']);
	var qty = parseInt(document.getElementById(domname).innerHTML)-1;
	Ajax.call('flow.php', 'step=price&rec_id=' + rec_id + '&number=' + qty, changecartPriceResponse, 'GET', 'JSON');
}
/**
 * 接收返回的信息
 */
function changecartPriceResponse(res)
{
  if (res.err_msg.length > 0 )
  {
    alert(res.err_msg);
  }
  else
  {
	var domnum='goods_number_'+res.rec_id;
	if(res.qty <= 0){
    	document.getElementById('CART_INFO').innerHTML = res.content1;
	}else{
    	document.getElementById(domnum).innerHTML = res.qty;
	}
    document.getElementById('ECS_CARTINFO').innerHTML = res.result;
  }
}


function changallser(allser)
{
	document.getElementById(allser).className='item fore';
}
</script> 
<script>
$('.search-type li').click(function() {
    $(this).addClass('cur').siblings().removeClass('cur');
    $('#searchtype').val($(this).attr('num'));
});
</script>
<script type="text/javascript">
  var process_request = "<?php echo $this->_var['lang']['process_request']; ?>";
</script>