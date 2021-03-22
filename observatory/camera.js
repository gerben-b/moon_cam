var index = 0;

function show_remaining_time() {
    var shutter = observatory.get_profile_state("shutter") * observatory.get_profile_state("factor");
    var value = Math.round((shutter / 1000000) * 1000000);
    document.getElementById("time_label").innerHTML = (value / 1000000) + " S";
}

function set_devide_value(checked) {
    observatory.set_profile_state("devide_value", checked);
    var shutter_value = observatory.get_profile_state("shutter_value");
    var shutter = shutter_value;
    if (checked == true) {
        document.getElementById("multiply_value").checked = false;
        shutter = 0.01 * shutter_value;
        observatory.set_profile_state("multiply_value", false);
    }
    observatory.set_profile_state("shutter", shutter);
    show_remaining_time();
}

function set_multiply_value(checked) {
    observatory.set_profile_state("multiply_value", checked);
    var shutter_value = parseInt(document.getElementById("shutter_value").value);
    var shutter = shutter_value;
    if (checked == true) {
        document.getElementById("devide_value").checked = false;
        shutter = 1000 * shutter_value;
        observatory.set_profile_state("devide_value", false);
    }
    observatory.set_profile_state("shutter", shutter);
    show_remaining_time();
}

function show_default(key, value, color) {
    if (is_default(key, value)) {
        document.getElementById(key).style.backgroundColor = color;
    } else {
        document.getElementById(key).style.backgroundColor = "#d3d3d3";
    }
}

function set_shutter_value(value) {
    observatory.set_profile_state("shutter", value);
    observatory.set_profile_state("shutter_value", value);
    show_default("shutter_value", value, "#44AA44");
    if (observatory.get_profile_state("multiply_value") == true) {set_multiply_value(true);}
    if (observatory.get_profile_state("devide_value") == true) {set_devide_value(true);}
    show_remaining_time();
}

function set_contrast_value(value) {
    observatory.set_profile_state("contrast_value", value, "#44AA44");
    show_default("contrast_value", value, "#44AA44");
}

function set_red_gain_value(value) {
    observatory.set_profile_state("red_gain_value", value);
    show_default("red_gain_value", value, "#44AA44");
}

function set_blue_gain_value(value) {
    observatory.set_profile_state("blue_gain_value", value);
    show_default("blue_gain_value", value, "#44AA44");
}

function set_timelapse_value(value) {
    observatory.set_profile_state("timelapse_value", value * 1000);
}

function set_v_contrast_value(value) {
    observatory.set_profile_state("v_contrast_value", value);
    show_default("v_contrast_value", value, "#AA4444");
}

function take_video() {
    document.getElementById("image").src = "gray.png";
    document.getElementById("video_button").style.backgroundColor = "#222222"; 
    var xmlhttp;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.responseText == "0" && xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            show_video();
        }
    }
    xmlhttp.open("GET", "video_mode.php?contrast=" + observatory.get_profile_state("v_contrast_value"), true);
    xmlhttp.send();
}

function show_video() {
    var timestamp = (new Date).getTime();
    var url = "http://rpi4:8080/?action=stream&timestamp=" + timestamp;
    document.getElementById("image").src = url;
    document.title = "Video";
    document.getElementById("video_button").style.backgroundColor = "#AA4444"; 
}

function take_photo() {
    document.getElementById("image").src = "gray.png";
    document.getElementById("photo_button").style.backgroundColor = "#222222";
    var xmlhttp;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.responseText == "0" && xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            show_photo();
        }
    }
    xmlhttp.open("GET", "still_mode.php?shutter=" + (observatory.get_profile_state("shutter") * observatory.get_profile_state("factor"))
                                    + "&contrast=" + observatory.get_profile_state("contrast_value")
                                    + "&red_gain=" + observatory.get_profile_state("red_gain_value")
                                    + "&blue_gain=" + observatory.get_profile_state("blue_gain_value")
                                    + "&index=" + index
                                    , true);
    xmlhttp.send();
}

function show_photo() {
    var timestamp = (new Date).getTime();
    var url = "ram/image_" + index++ + ".jpg?timestamp=" + timestamp;
    document.getElementById("image").src = url;
    document.title = "Photo";
    document.getElementById("photo_button").style.backgroundColor = "#44AA44"; 
}

function take_timelapse() {
    document.getElementById("image").src = "gray.png";
    document.getElementById("timelapse_button").style.backgroundColor = "#222222";
    var xmlhttp;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.responseText == "0" && xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            show_timelapse();
        }
    }
    xmlhttp.open("GET", "timelapse_mode.php?shutter=" + (observatory.get_profile_state("shutter") * observatory.get_profile_state("factor"))
                                        + "&timelapse=" + observatory.get_profile_state("timelapse_value")
                                        + "&contrast=" + observatory.get_profile_state("contrast_value")
                                        + "&red_gain=" + observatory.get_profile_state("red_gain_value")
                                        + "&blue_gain=" + observatory.get_profile_state("blue_gain_value")
                                        , true);
    xmlhttp.send();
}

function show_timelapse() {
    var timestamp = (new Date).getTime();
    var url = "ram/burst_00000.jpg?timestamp=" + timestamp;
    document.getElementById("image").src = url;
    document.title = "Burst";
    document.getElementById("timelapse_button").style.backgroundColor = "#55BB55"; 
}

function show_information() {
    var local_options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        timeZone: 'Europe/Amsterdam',
        timeZoneName: 'short'
    };
    var utc_options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        timeZone: 'UTC',
        timeZoneName: 'short'
    };
    var now = new Date;
    var utc_timestamp = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
    var latitude = parseFloat(document.getElementById("latitude").innerHTML);
    var longitude = parseFloat(document.getElementById("longitude").innerHTML);
    var altitude = parseInt(document.getElementById("altitude").innerHTML);
    var sun_position = SunCalc.getPosition(utc_timestamp, latitude, longitude);
    var moon_position = SunCalc.getMoonPosition(utc_timestamp, latitude, longitude);
    var moon_illumination = SunCalc.getMoonIllumination(utc_timestamp, latitude, longitude);
    var zenith_angle = moon_illumination.angle - moon_position.parallacticAngle;
    draw(moon_illumination.phase, moon_position.parallacticAngle * 180 / Math.PI);
    let observer = new Astronomy.Observer(52.0029907, 5.1857599, altitude);
    let sun_equ_ofdate = Astronomy.Equator('Sun', now, observer, true, true);
    let sun_hor = Astronomy.Horizon(now, observer, sun_equ_ofdate.ra, sun_equ_ofdate.dec, 'normal');
    let moon_equ_ofdate = Astronomy.Equator('Moon', now, observer, true, true);
    let moon_hor = Astronomy.Horizon(now, observer, moon_equ_ofdate.ra, moon_equ_ofdate.dec, 'normal');
    document.getElementById("sun_altitude").innerHTML = new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 1, minimumFractionDigits: 5 }).format(sun_hor.altitude);
    document.getElementById("sun_azimuth").innerHTML = new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 1, minimumFractionDigits: 5 }).format(sun_hor.azimuth);
    document.getElementById("moon_altitude").innerHTML = new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 1, minimumFractionDigits: 5 }).format(moon_hor.altitude);
    document.getElementById("moon_azimuth").innerHTML = new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 1, minimumFractionDigits: 5 }).format(moon_hor.azimuth);
    var altitude_visible = (moon_hor.altitude) > 10;
    var azimuth_visible = (moon_hor.azimuth) > 130 && (moon_hor.azimuth) < 280;
    if (!altitude_visible || !azimuth_visible) {
        document.getElementById("moon_altitude").style.color = '#FAA';
        document.getElementById("moonaltitude").style.color = '#FAA';
        document.getElementById("moon_azimuth").style.color = '#FAA';
        document.getElementById("moonazimuth").style.color = '#FAA';
    }
    if (altitude_visible) {
        document.getElementById("moon_altitude").style.color = '#AAF';
        document.getElementById("moonaltitude").style.color = '#AAF';
    }
    if (azimuth_visible) {
        document.getElementById("moon_azimuth").style.color = '#AAF';
        document.getElementById("moonazimuth").style.color = '#AAF';
    }
    if (altitude_visible && azimuth_visible) {
        document.getElementById("moon_altitude").style.color = '#5F5';
        document.getElementById("moonaltitude").style.color = '#5F5';
        document.getElementById("moon_azimuth").style.color = '#5F5';
        document.getElementById("moonazimuth").style.color = '#5F5';
    }
    document.getElementById("current_time").innerHTML = new Intl.DateTimeFormat("nl-NL", local_options).format(now);
    document.getElementById("utc_time").innerHTML = new Intl.DateTimeFormat("nl-NL", utc_options).format(now);
    let jup_equ_ofdate = Astronomy.Equator('Jupiter', now, observer, true, true);
    let jup_hor = Astronomy.Horizon(now, observer, jup_equ_ofdate.ra, jup_equ_ofdate.dec, 'normal');
    document.getElementById("jupiter_altitude").innerHTML = new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 1, minimumFractionDigits: 5 }).format(jup_hor.altitude);
    document.getElementById("jupiter_azimuth").innerHTML = new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 1, minimumFractionDigits: 5 }).format(jup_hor.azimuth);
    altitude_visible = jup_hor.altitude > 10;
    azimuth_visible = jup_hor.azimuth > 130 && jup_hor.azimuth < 280;
    if (!altitude_visible || !azimuth_visible) {
        document.getElementById("jupiter_altitude").style.color = '#FAA';
        document.getElementById("jupiteraltitude").style.color = '#FAA';
        document.getElementById("jupiter_azimuth").style.color = '#FAA';
        document.getElementById("jupiterazimuth").style.color = '#FAA';
    }
    if (altitude_visible) {
        document.getElementById("jupiter_altitude").style.color = '#AAF';
        document.getElementById("jupiteraltitude").style.color = '#AAF';
    }
    if (azimuth_visible) {
        document.getElementById("jupiter_azimuth").style.color = '#AAF';
        document.getElementById("jupiterazimuth").style.color = '#AAF';
    }
    if (altitude_visible && azimuth_visible) {
        document.getElementById("jupiter_altitude").style.color = '#5F5';
        document.getElementById("jupiteraltitude").style.color = '#5F5';
        document.getElementById("jupiter_azimuth").style.color = '#5F5';
        document.getElementById("jupiterazimuth").style.color = '#5F5';
    }
    let mar_equ_ofdate = Astronomy.Equator('Mars', now, observer, true, true);
    let mar_hor = Astronomy.Horizon(now, observer, mar_equ_ofdate.ra, mar_equ_ofdate.dec, 'normal');
    document.getElementById("mars_altitude").innerHTML = new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 1, minimumFractionDigits: 5 }).format(mar_hor.altitude);
    document.getElementById("mars_azimuth").innerHTML = new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 1, minimumFractionDigits: 5 }).format(mar_hor.azimuth);
    altitude_visible = mar_hor.altitude > 10;
    azimuth_visible = mar_hor.azimuth > 130 && mar_hor.azimuth < 280;
    if (!altitude_visible || !azimuth_visible) {
        document.getElementById("mars_altitude").style.color = '#FAA';
        document.getElementById("marsaltitude").style.color = '#FAA';
        document.getElementById("mars_azimuth").style.color = '#FAA';
        document.getElementById("marsazimuth").style.color = '#FAA';
    }
    if (altitude_visible) {
        document.getElementById("mars_altitude").style.color = '#AAF';
        document.getElementById("marsaltitude").style.color = '#AAF';
    }
    if (azimuth_visible) {
        document.getElementById("mars_azimuth").style.color = '#AAF';
        document.getElementById("marsazimuth").style.color = '#AAF';
    }
    if (altitude_visible && azimuth_visible) {
        document.getElementById("mars_altitude").style.color = '#5F5';
        document.getElementById("marsaltitude").style.color = '#5F5';
        document.getElementById("mars_azimuth").style.color = '#5F5';
        document.getElementById("marsazimuth").style.color = '#5F5';
    }
}

setInterval(show_information, 100);
