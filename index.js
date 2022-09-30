var app = new window.Webex.Application();
const token = 'ZTNjZmVhZDgtNTczNC00ODIxLWEzNDAtODY1ZDY2NmVkMWJjYTY4YzA5NmYtYmQw_P0A1_87d196ed-78e2-4d2c-aa0d-942aced0610b';
const id = localStorage.getItem('bgcolor')

app.onReady().then(function () {
    console.log('App is ready. App info:', app);
});


function handleGetMeeting() {
    app.context.getMeeting().then((m) => {
        log('getMeeting()', m);
        console.log(m)
        localStorage.setItem('bgcolor', m.id);

    }).catch((error) => {
        log('getMeeting() promise failed with error', Webex.Application.ErrorCodes[error]);
    });
}



//oauth 
//
const clientId = "Cef95f5235fee30b3ecb3aac56ea4eb4723fa4a9cadac2039d721cba0b8d61044";
const clientSecret = "88f67e3fd47e7a3869a236b8779b8475a96e6c9ad1f5bf0b800326e9b74c5976";
const scopes = "spark:people_read";
const state = "CiscoDevNet";
const redirectURI = `http://localhost:8080/oauth`;
function oauth() {

    fetch(` https://webexapis.com/v1/authorize?client_id=Cef95f5235fee30b3ecb3aac56ea4eb4723fa4a9cadac2039d721cba0b8d61044&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Foauth&scope=meeting%3Aadmin_preferences_write%20meeting%3Aadmin_schedule_write%20meeting%3Aadmin_preferences_read%20meeting%3Aschedules_read%20meeting%3Aparticipants_read%20spark%3Apeople_read%20meeting%3Aadmin_participants_read%20meeting%3Apreferences_write%20spark%3Amemberships_write%20meeting%3Apreferences_read%20spark%3Arooms_write%20spark%3Axapi_statuses%20meeting%3Aschedules_write%20spark-compliance%3Arooms_read%20spark%3Amemberships_read%20spark%3Akms%20meeting%3Acontrols_write%20spark%3Arooms_read%20meeting%3Acontrols_read%20meeting%3Aparticipants_write%20spark-compliance%3Arooms_write%20meeting%3Aadmin_transcripts_read&state=set_state_here`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json',          
        },
        // form: {
        //     grant_type: "authorization_code",
        //     client_id: clientId,
        //     client_secret: clientSecret,
        //     code: state,
        //     redirect_uri: redirectURI
        // }
    }).then((response) => response)
        .then((data) => log('updateMeetings()', data));
}







function log(type, data) {
    var ul = document.getElementById("console");
    var li = document.createElement("li");
    var payload = document.createTextNode(`${type}: ${JSON.stringify(data)}`);
    li.appendChild(payload)
    ul.prepend(li);
}


// enable the  breakoutsessions api

function update() {
    document.getElementById("formContainer").style.display = "block";
}

function Submit() {
    title = document.getElementById("title").value;
    password = document.getElementById("password").value;
    enabledBreakoutSessions = document.getElementById("enabledBreakoutSessions").value;

    const Res = {};

    const Backend = Object.create(Res);
    Backend.title = title;
    Backend.password = password;
    Backend.enabledBreakoutSessions = enabledBreakoutSessions;
    log('Submit()', Backend);

    updateMeetings(Backend)
}

function updateMeetings(data) {

    const myDateStart = new Date(Date.now() + (24000 * 60 * 60)).toISOString(); // 24 Hours from Now
    const myDateEnd = new Date(Date.now() + (25000 * 60 * 60)).toISOString(); // 25 Hours from Now
    const obj = {
        title: data.title,
        password: data.password,
        start: myDateStart,
        end: myDateEnd,
        enabledBreakoutSessions: data.enabledBreakoutSessions,
    }
    fetch(`https://webexapis.com/v1/meetings/${id}`, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer  ${token}`,
        },
        body: JSON.stringify(obj)
    }).then((response) => response.json())
        .then((data) => log('updateMeetings()', data));
}


//////  update the breackoutsessions name, invittes

function updateSessions() {
    document.getElementById("updateSessions").style.display = "block";
}
function updatesection() {
    const hostEmail = document.getElementById("hostEmail").value;
    const name = document.getElementById("name").value;
    const invitees = document.getElementById("invitees").value;
    const Res = {};
    console.log(hostEmail);
    const Backend = Object.create(Res);
    Backend.hostEmail = hostEmail;
    Backend.items = [
        {

            name: name,
            invitees: [
                invitees
            ]
        },]

    updateMeetingsBreakoutSessions(Backend)
}
function updateMeetingsBreakoutSessions(data) {

    console.log(data)
    const obj = {
        hostEmail: data.hostEmail,
        items: data.items,

    }


    fetch(`https://webexapis.com/v1/meetings/${id}/breakoutSessions`, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer  ${token}`,

        },
        body: JSON.stringify(obj)


    })
        .then((response) => response.json())
        .then((data) => log('updateMeetings()', data));
}



// get breakout rooms  list


function getSessions() {
    document.getElementById("GetMeetingSession").style.display = "block";
}
function getMeetingssection() {
    const hostEmail = document.getElementById("hostEmailu").value;
    const Res = {};
    console.log("hostEmail", hostEmail);
    const Backend = Object.create(Res);
    Backend.hostEmail = hostEmail;

    GetMeetingSessions(Backend)
}

function GetMeetingSessions(data) {

    const obj = JSON.stringify({
        hostEmail: data.hostEmail,

    })
    fetch(`https://webexapis.com/v1/meetings/${id}/breakoutSessions`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer  ${token}`,
            'hostEmail': data.hostEmail,

        },
    })
        .then((response) => response.json())
        .then((data) => log('updateMeetings()', data));
}




