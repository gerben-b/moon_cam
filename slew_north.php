<?php
  $output=null;
  $retval=null;
  exec("/home/pi/cam/streamer/scope_slew_north.sh", $output, $retval);
  echo $retval;
 ?>
