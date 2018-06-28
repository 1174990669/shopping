<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<base href="http://www.sharpstar.cn/" />
<meta name="Generator" content="68ECSHOP v4_1" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="Keywords" content="<?php echo $this->_var['keywords']; ?>" />
<meta name="Description" content="<?php echo $this->_var['description']; ?>" />
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />

<title><?php echo $this->_var['page_title']; ?></title>



<link rel="shortcut icon" href="favicon.ico" />
<link rel="icon" href="animated_favicon.gif" type="image/gif" />
<link rel="stylesheet" type="text/css" href="themes/68ecshopcom_360buy/css/allbrands.css" />
<script type="text/javascript" src="themes/68ecshopcom_360buy/js/jquery-1.9.1.min.js"></script>
<?php echo $this->smarty_insert_scripts(array('files'=>'common.js,transport.js')); ?>
<script>
function setTabCatGoods(name,cursel,n){
for(i=1;i<=n;i++){
var menu=document.getElementById(name+i);
var con=document.getElementById("con_"+name+"_"+i);
menu.className=i==cursel?"curr":"";
con.style.display=i==cursel?"block":"none";
}
}
//-->
</script>
</head>
<body> 
<div id="site-nav"> 
<?php echo $this->fetch('library/page_header.lbi'); ?>
  <div class="blank"></div>
  <div class="w">
    <ul class="tab" id="tab-link">
      <li><a href="catalog.php">全部商品分类</a></li>
      <li class="curr"><a href="brand.php">全部品牌</a></li>
      <li><a href="search.php">全部商品</a></li>
    </ul>
     
  </div>
  <div id="allbrand" class="w">
    <div class="corner corner-t"> <b class="tl"></b> <b class="tr"></b> </div>
    <div class="corner corner-b"> <b class="bl"></b> <b class="br"></b> </div>
    <div class="content">
      <div id="i-allbrand">
        <div id="co-brands">
          <div class="mt">
            <h2>推荐品牌<b></b></h2>
            <div class="extra"></div>
          </div>
          <div class="mc brandslist">
            <ul class="list-h">
              
              <?php $_from = $this->_var['brand_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'brand_data');$this->_foreach['brand_list_foreach'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['brand_list_foreach']['total'] > 0):
    foreach ($_from AS $this->_var['brand_data']):
        $this->_foreach['brand_list_foreach']['iteration']++;
?> 
              <?php if ($this->_var['brand_data']['brand_logo'] || $this->_foreach['brand_list_foreach']['iteration'] < 31): ?>
              
              <li>
                <div><span class="b-img"><a href="<?php echo $this->_var['brand_data']['url']; ?>" target="_blank"><img width="100" height="40" src="data/brandlogo/<?php echo $this->_var['brand_data']['brand_logo']; ?>" alt="<?php echo htmlspecialchars($this->_var['brand_data']['brand_name']); ?>" /></a></span><span class="b-name"><a href="<?php echo $this->_var['brand_data']['url']; ?>" target="_blank"><?php echo htmlspecialchars($this->_var['brand_data']['brand_name']); ?></a></span></div>
              </li>
              
              <?php endif; ?> 
              <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
              
            </ul>
          </div>
          <div class="mb"> <b class="bl"></b> <b class="br"></b> </div>
        </div>
        <?php
	  $GLOBALS['smarty']->assign('categories',       get_categories_tree(0)); // 分类树
	  ?>
        <div style=" margin:0px auto; margin-bottom:20px; padding-bottom:20px;" id="b-allbrand">
          <ul id="tab-sort" class="tab">
            <?php $_from = $this->_var['categories']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'cat');$this->_foreach['categories'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['categories']['total'] > 0):
    foreach ($_from AS $this->_var['cat']):
        $this->_foreach['categories']['iteration']++;
?> 
            <?php if ($this->_foreach['categories']['iteration'] < 12): ?> 
            <li id="goods<?php echo $this->_foreach['categories']['iteration']; ?>" onclick="setTabCatGoods('goods',<?php echo $this->_foreach['categories']['iteration']; ?>,11)"  <?php if ($this->_foreach['categories']['iteration'] == 1): ?>class="curr"<?php endif; ?>><a href="javascript:void(0);"><?php echo htmlspecialchars($this->_var['cat']['name']); ?></a>
            </li>
            <?php endif; ?> 
            <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
            
          </ul>
          <?php $_from = $this->_var['categories']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'cat');$this->_foreach['categories'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['categories']['total'] > 0):
    foreach ($_from AS $this->_var['cat']):
        $this->_foreach['categories']['iteration']++;
?> 
          <?php if ($this->_foreach['categories']['iteration'] < 12): ?>
          <?php
					 $GLOBALS['smarty']->assign('get_cat_brands', get_cat_brands($GLOBALS['smarty']->_var['cat']['id']));
  ?>
          <div class="brandslist tabcon" <?php if ($this->_foreach['categories']['iteration'] == 1): ?> style="display:block"<?php else: ?>style="display:none"<?php endif; ?> id="con_goods_<?php echo $this->_foreach['categories']['iteration']; ?>"> 
          <?php if ($this->_var['get_cat_brands']): ?>
          <ul class="list-h">
            
            <?php $_from = $this->_var['get_cat_brands']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'brand_cat');$this->_foreach['get_cat_brands'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['get_cat_brands']['total'] > 0):
    foreach ($_from AS $this->_var['brand_cat']):
        $this->_foreach['get_cat_brands']['iteration']++;
?>
            <li>
              <div><span class="b-img"><a target="_blank" href="brand.php?id=<?php echo $this->_var['brand_cat']['id']; ?>"><img width="138" height="46" alt="<?php echo $this->_var['brand_cat']['name']; ?>" src="data/brandlogo/<?php echo $this->_var['brand_cat']['logo']; ?>"/></a></span><span class="b-name"><a target="_blank" href="brand.php?id=<?php echo $this->_var['brand_cat']['id']; ?>"><?php echo $this->_var['brand_cat']['name']; ?></a></span></div>
            </li>
            <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
          </ul>
          <?php else: ?>
          <div style="padding:20px; width:150px; margin:0px auto; font-size:14px; font-weight:bold ">当前分类无品牌!</div>
          
          <?php endif; ?> 
        </div>
        <?php endif; ?> 
        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?> 
        
      </div>
    </div>
  </div>
</div>
<?php echo $this->fetch('library/help.lbi'); ?> 
<?php echo $this->fetch('library/page_footer.lbi'); ?>
</div>
</body>
</html>
