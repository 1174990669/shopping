 <?php if ($this->_var['user_info']): ?>
      <h3>亲爱的：<?php echo $this->_var['user_info']['username']; ?></h3>
      <?php else: ?>
      <h3><a href="user.php" target="_top" style="color:#fff">请先登录</a></h3>
      <?php endif; ?>