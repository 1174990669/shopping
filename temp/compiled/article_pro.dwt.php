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
<link href="<?php echo $this->_var['ecs_css_path']; ?>" rel="stylesheet" type="text/css" />

<?php echo $this->smarty_insert_scripts(array('files'=>'common.js,transport.js')); ?>
</head>
<body> 
<script type="text/javascript" src="themes/68ecshopcom_360buy/js/base-2011.js"></script>
<div id="site-nav"> 
  <?php echo $this->fetch('library/page_header.lbi'); ?>
  <div class="blank"></div>
  <?php echo $this->fetch('library/ur_here.lbi'); ?>
  <div class="w main">
    <div class="box">
      <div class="box_1">
        <h3 style="height:30px; line-height:30px; border:#E4E4E4 1px solid; border-bottom:none; text-indent:15px; border-top:2px solid #aaaaaa; background:#F7F7F7"><span><?php echo htmlspecialchars($this->_var['article']['title']); ?></span></h3>
        <div class="boxCenterList"> 
          <?php if ($this->_var['article']['content']): ?> 
          <?php echo $this->_var['article']['content']; ?> 
          <?php endif; ?> 
        </div>
      </div>
    </div>
    <div class="blank5"></div>
  </div>
  <?php echo $this->fetch('library/help.lbi'); ?> 
  <?php echo $this->fetch('library/page_footer.lbi'); ?> 
</div>
</body>
</html>
