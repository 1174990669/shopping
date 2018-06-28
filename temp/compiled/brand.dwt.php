<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<base href="http://www.weiweigogo.cn/" />
<meta name="Generator" content="68ECSHOP v4_1" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="Keywords" content="<?php echo $this->_var['keywords']; ?>" />
<meta name="Description" content="<?php echo $this->_var['description']; ?>" />
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />

<title><?php echo $this->_var['page_title']; ?></title>



<link rel="shortcut icon" href="favicon.ico" />
<link rel="icon" href="animated_favicon.gif" type="image/gif" />

<?php echo $this->smarty_insert_scripts(array('files'=>'common.js,global.js,compare.js')); ?>
<script>var jdpts = new Object(); jdpts._st = new Date().getTime();</script>
<link rel="stylesheet" type="text/css" href="themes/68ecshopcom_360buy/css/category.css" />
<style>
/*------商品筛选------*/

.goods_sxtitle {
	BORDER-BOTTOM: #CE0000 1px solid;
	HEIGHT: 33px;
	BORDER-TOP: #e4e4e4 1px solid;
	BORDER-RIGHT: #e4e4e4 1px solid;
	BORDER-left: #e4e4e4 1px solid;
	line-height: 33px;
	text-align: left;
	text-indent: 5px;
	position: relative;
}
.goods_sxtitle span {
	font-size: 14px;
	font-weight: lighter
}
.goods_sxtitle img {
	position: absolute;
	top: 10px;
	left: 5px;
}
.blank5 {
	height: 5px;
	line-height: 5px;/* _margin:-3px 0;*/
	clear: both;
	visibility: hidden;
}
</style>
</head><body>
<script src="themes/68ecshopcom_360buy/js/jquery_006.js"></script> 
<script src="themes/68ecshopcom_360buy/js/search_goods.js"></script> 
<script type="text/javascript" src="themes/68ecshopcom_360buy/js/jquery-lazyload.js" ></script> 
<?php echo $this->smarty_insert_scripts(array('files'=>'jquery.json.js,transport.js')); ?>
<div id="site-nav"> 
  <?php echo $this->fetch('library/page_header.lbi'); ?>
  <div class="blank"></div>
  <?php echo $this->fetch('library/ur_here.lbi'); ?>
  <div class="w main">
    <div class="right-extra">
      <div class="box">
        <h3 class="goods_sxtitle"><span><?php echo $this->_var['brand']['brand_name']; ?></span></h3>
        <div class="boxCenterList">
          <table width="100%" border="0" cellpadding="5" cellspacing="1" bgcolor="#dddddd">
            <tr>
              <td bgcolor="#ffffff" width="200" align="center" valign="middle"><div style="width:200px; overflow:hidden;"> 
                  <?php if ($this->_var['brand']['brand_logo']): ?> 
                  <img src="data/brandlogo/<?php echo $this->_var['brand']['brand_logo']; ?>" /> 
                  <?php endif; ?> 
                </div></td>
              <td bgcolor="#ffffff"> <?php echo nl2br($this->_var['brand']['brand_desc']); ?><br />
                
                <?php if ($this->_var['brand']['site_url']): ?> 
                <?php echo $this->_var['lang']['official_site']; ?> <a href="<?php echo $this->_var['brand']['site_url']; ?>" target="_blank" class="f6"><?php echo $this->_var['brand']['site_url']; ?></a><br />
                
                <?php endif; ?></td>
            </tr>
          </table>
        </div>
      </div>
      <div class="blank5"></div>
      <?php echo $this->fetch('library/goods_list.lbi'); ?> 
	  <?php echo $this->fetch('library/pages.lbi'); ?> 
    </div>
    <div class="left"> 
	  <?php echo $this->fetch('library/category_tree.lbi'); ?>
      <div class="blank5"></div>
      <?php echo $this->fetch('library/top10.lbi'); ?> 
      
      <div id="alsobuy" class="hide m m0"></div>
       
       
    </div>
    
    <div style="height:0px; line-height:0px; clear:both;"></div>
  </div>
  <?php echo $this->fetch('library/history.lbi'); ?>
  <div style="height:0px; line-height:0px; clear:both;"></div>
  <?php echo $this->fetch('library/help.lbi'); ?>
  <?php echo $this->fetch('library/page_footer.lbi'); ?>
   <?php echo $this->fetch('library/site_bar.lbi'); ?> 
</div>
<script type="text/javascript" src="themes/68ecshopcom_360buy/js/lib-v1.js"></script> 
<script>
var skuIds = [];
$('ul.list-h li[sku]').each(function(i){
    skuIds.push($(this).attr('sku'));
})

/* spu合并 begin */
var imgSize = 'n2';
if ( $('#plist').hasClass('plist-160') ) {
    imgSize = 'n2';
}
if ( $('#plist').hasClass('plist-220') ) {
    if ( $('#plist').hasClass('plist-160') ) {
        imgSize = 'n2';
    } else {
        imgSize = 'n7';
    }
}
if ( $('#plist').hasClass('plist-n7') ) {
    imgSize = 'n7';
}
if ( $('#plist').hasClass('plist-n8') ) {
    imgSize = 'n8';
}


$('.p-scroll').each(function() {
    var scroll = $(this).find('.p-scroll-wrap'),
        btnPrev = $(this).find('.p-scroll-prev'),
        btnNext = $(this).find('.p-scroll-next'),
        len = $(this).find('li').length;
    if ( len > 5 ) {
        btnPrev.css('display', 'inline');
        btnNext.css('display', 'inline');
        scroll.imgScroll({
            visible: 5,
            showControl: false,
            next: btnNext,
            prev: btnPrev
        });
    }
    var colors = scroll.find('img');
    colors.each(function() {
        $(this).mouseover(function() {
            var index = $(this).parent('li').parent('li').attr('index');
            var src = $(this).attr("src"),
                skuid = $(this).attr('data-skuid');
            scroll.find('a').removeClass('curr');
            $(this).parent('a').addClass('curr');
            var targetImg = $(this).parents('li').find('.p-img img').eq(0),
                targetImgLink = $(this).parents('li').find('.p-img a').eq(0),
                targetNameLink = $(this).parents('li').find('.p-name a').eq(0),
                targetFollowLink = $(this).parents('li').find('.product-follow a').eq(0);
            targetImg.attr( 'src', src.replace('\/n5\/', '\/'+imgSize+'\/') );
            targetImgLink.attr( 'href', targetImgLink.attr('href').replace(/\/\d{6,}/, '/'+skuid) );
            targetNameLink.attr( 'href', targetNameLink.attr('href').replace(/\/\d{6,}/, '/'+skuid) );
            targetFollowLink.attr( 'id', targetFollowLink.attr('id').replace(/coll\d{6,}/, 'coll'+skuid) );

        });
    });
});
$('#plist.plist-n7 .list-h>li').hover(function() {
    $(this).addClass('hover').find('.product-follow,.shop-name').show();
    $(this).find('.item-wrap').addClass('item-hover');
}, function() {
    $(this).removeClass('hover').find('.item-wrap').removeClass('item-hover');
    $(this).find('.product-follow,.shop-name').hide();
});


/* spu合并 end */
</script> 
<script type="text/javascript">
$(document).ready(function(){
var headHeight=580;  //这个高度其实有更好的办法的。使用者根据自己的需要可以手工调整。
 
var nav=$("#filter");        //要悬浮的容器的id
$(window).scroll(function(){
 
if($(this).scrollTop()>headHeight){
nav.addClass("cat-nav-fixed");   //悬浮的样式
}
else{
nav.removeClass("cat-nav-fixed");
}
})
})
</script> 
 
<script type="text/javascript">
$("img").lazyload({
    effect       : "fadeIn",
	 skip_invisible : true,
	 failure_limit : 20
});
</script> 

</body>
</html>
