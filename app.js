var interval; 

$(document).ready(function(){
    $("#submit").click(function(e){
        e.preventDefault();
    
        var input = $("#dob-input").val();
        
        if (input.trim() === "") {
            $("#error-message").text("Please enter your date of birth.").show();
        } else {
            $("#error-message").hide();
            var dob = new Date(input);
            save(dob);
            renderAgeLoop();
        }
    });

    function save(dob)
    {
        localStorage.dob = dob.getTime();
    };

    $("#back-to-age-selection").click(function() {
        $("#choose").css("display", "block");
        $("#timer").css("display", "none");
        clearInterval(interval);
    });

    function save(dob)
    {
        localStorage.dob = dob.getTime();
    };

    function load()
    {
        var dob;
        if (dob = localStorage.getItem("dob"))
        {
            return new Date(parseInt(dob));
        }
        return -1;
    };

    function renderAgeLoop()
    {
        clearInterval(interval);
        var dob = load();
        $("#choose").css("display", "none");
        $("#timer").css("display", "block");

        interval = setInterval(function(){ 
            var age = getAge(dob);
            $("#age").html(age.year + "<sup>." + age.ms + "</sup>");
        }, 100);
    };

    function renderChoose()
    {
        $("#choose").css("display", "block");
    };

    function getAge(dob){
        var now       = new Date;
        var duration  = now - dob;
        var years     = duration / 31556900000;
        
        var majorMinor = years.toFixed(9).toString().split('.');
        
        return {
            "year": majorMinor[0],
            "ms": majorMinor[1]
        };
    };

    function main() {
        if (load() != -1)
        {
            renderAgeLoop();
        } else {
            renderChoose();
        }
    };
    main();
});
