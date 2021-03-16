var profile_choice = 0;
var iris_choice = 0;

var configuration = {
    profiles: [],
    iris_setting: []
};

function initialise() {
    document.getElementById("image").src = "gray.png";
    load_profiles();
}

function load_profiles() {
    var xmlhttp;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var reply = xmlhttp.responseText.replace(/(\r\n|\n|\r)/gm, "");
            configuration = JSON.parse(reply);
            apply_configuration();
            apply_profile();
            apply_iris_setting();
            apply_iris();
        }
    }
    var timestamp = (new Date).getTime();
    xmlhttp.open("GET", "configuration.json?timestamp=" + timestamp, true);
    xmlhttp.send();
}

function apply_configuration() {
    var profile_chooser = document.getElementById("profile");
    for (var i = 0; i < configuration.profiles.length; i++)
    {
        var option = document.createElement("option");
        option.value = configuration.profiles[i].profile_id;
        option.innerHTML = configuration.profiles[i].profile;
        profile_chooser.appendChild(option);
    }
    profile_choice = parseInt(document.getElementById("profile").value);
    profile_chooser.addEventListener("change", apply_profile, false);
}

function apply_profile() {
    profile_choice = parseInt(document.getElementById("profile").value);
    var red_gain_value = configuration.profiles[profile_choice].red_gain_value;
    var blue_gain_value = configuration.profiles[profile_choice].blue_gain_value;
    var shutter_value = configuration.profiles[profile_choice].shutter_value;
    var contrast_value = configuration.profiles[profile_choice].contrast_value;
    var v_contrast_value = configuration.profiles[profile_choice].v_contrast_value;
    var timelapse_value = configuration.profiles[profile_choice].timelapse_value;
    var devide_value = configuration.profiles[profile_choice].devide_value;
    var multiply_value = configuration.profiles[profile_choice].multiply_value;

    document.getElementById("red_gain_value").value = red_gain_value;
    document.getElementById("blue_gain_value").value = blue_gain_value;
    document.getElementById("shutter_value").value = shutter_value;
    document.getElementById("contrast_value").value = contrast_value;
    document.getElementById("v_contrast_value").value = v_contrast_value;

    document.getElementById("timelapse_value").value = Math.round(timelapse_value / 1000);
    document.getElementById("devide_value").checked = devide_value;
    document.getElementById("multiply_value").checked = multiply_value;
    show_remaining_time();

    set_devide_value(configuration.profiles[profile_choice].devide_value);
    set_multiply_value(configuration.profiles[profile_choice].multiply_value);
    set_red_gain_value(red_gain_value);
    set_blue_gain_value(blue_gain_value);
    set_shutter_value(shutter_value);
    set_contrast_value(contrast_value);
    set_v_contrast_value(v_contrast_value);
    set_timelapse_value(timelapse_value);
}

function apply_iris_setting() {
    var iris_chooser = document.getElementById("iris");
    for (var i = 0; i < configuration.iris_setting.length; i++)
    {
        var option = document.createElement("option");
        option.value = configuration.iris_setting[i].iris_id;
        option.innerHTML = configuration.iris_setting[i].iris;
        iris_chooser.appendChild(option);
    }
    iris_choice = parseInt(document.getElementById("iris").value);
    iris_chooser.addEventListener("change", apply_iris, false);
}

function apply_iris() {
    iris_choice = parseInt(document.getElementById("iris").value);
    var factor = configuration.iris_setting[iris_choice].factor;
    observatory.set_profile_state("factor", factor);
    show_remaining_time();
}

function is_default(key, value) {
    return configuration.profiles[profile_choice][key] == value;
}
