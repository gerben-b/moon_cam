<?php
  $shutter = $_GET['shutter'];
  $contrast = $_GET['contrast'];
  $red_gain = $_GET['red_gain'];
  $blue_gain = $_GET['blue_gain'];
  $index = $_GET['index'];
  $output=null;
  $retval=null;
  $cmdline=sprintf("/home/pi/cam/streamer/still_mode.sh %u %d %f %f %u", $shutter, $contrast, $red_gain, $blue_gain, $index);
  exec($cmdline, $output, $retval);
  echo $retval;
 ?>
