<?php
  $contrast = $_GET['contrast'];
  $output=null;
  $retval=null;
  $cmdline=sprintf("/home/pi/cam/streamer/video_mode.sh %d", $contrast);
  exec($cmdline, $output, $retval);
  echo $retval;
 ?>
