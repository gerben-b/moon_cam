function draw(phase, angle) {
  var left_outer_radius;
  var left_inner_radius;
  var right_outer_radius;
  var right_inner_radius;
  if (phase < 0.25) {
     left_outer_radius = 50;
     left_inner_radius = 50;
     right_outer_radius = 50;
     right_inner_radius = 50 - (50 * phase * 4);
  }
  if (phase >= 0.25 && phase < 0.5) {
     left_outer_radius = 50 * (phase - 0.25) * 4;
     left_inner_radius = 0;
     right_outer_radius = 50;
     right_inner_radius = 0;
  }
  if (phase >= 0.5 && phase < 0.75) {
     left_outer_radius = 50;
     left_inner_radius = 0;
     right_outer_radius = 50 - (50 * (phase - 0.5) * 4);
     right_inner_radius = 0;
  }
  if (phase >= 0.75 && phase <= 1) {
     left_outer_radius = 50;
     left_inner_radius = 50 * (phase - 0.75) * 4;
     right_outer_radius = 50;
     right_inner_radius = 50;
  }
  var move_to = "M49 99";
  var left_outer_arc = "A" + left_outer_radius + ",50 0 0,1 49 0";
  var left_inner_arc = "A" + left_inner_radius + ",50 0 0,0 49 99";
  var right_outer_arc = "A" + right_outer_radius + ",50 0 0,0 49 0";
  var right_inner_arc = "A" + right_inner_radius + ",50 0 0,1 49 99";
  var moon_illumination = document.getElementById("moon_illumination");
  moon_illumination.setAttribute("d", move_to + left_outer_arc + left_inner_arc + right_outer_arc + right_inner_arc);
  document.getElementById("svg").style.transform = 'rotate(' + angle + 'deg)';
}
