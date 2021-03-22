<?php
  $output=null;
  $retval=null;
  exec("/home/pi/cam/streamer/scope_track_lunar.sh", $output, $retval);
  echo $retval;
 ?>
