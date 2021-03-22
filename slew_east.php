<?php
  $output=null;
  $retval=null;
  exec("/home/pi/cam/streamer/scope_slew_east.sh", $output, $retval);
  echo $retval;
 ?>
