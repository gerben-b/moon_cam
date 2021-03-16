<?php
  $shutter = $_GET['shutter'];
  $timelapse = $_GET['timelapse'];
  $contrast = $_GET['contrast'];
  $red_gain = $_GET['red_gain'];
  $blue_gain = $_GET['blue_gain'];
  $output=null;
  $retval=null;
  $cmdline=sprintf("/home/pi/cam/streamer/timelapse_mode.sh %u %u %d %f %f", $shutter, $timelapse, $contrast, $red_gain, $blue_gain);
  exec($cmdline, $output, $retval);
  echo $retval;
 ?>
