<?php
  $output=null;
  $retval=null;
  exec("/home/pi/cam/streamer/scope_track_off.sh", $output, $retval);
  echo $retval;
 ?>
