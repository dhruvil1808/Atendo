//use spotify api to fetch data
import querystring from 'querystring';

var secret = generateRandomString(16);

function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

const client_id = 'ee2bc24c4b724407b997e1be6b6b2368';
const redirect_uri = 'http://localhost:5050/callback';
const scopes = 'user-read-private user-read-email';
const client_secret = 'b4f0bdf02510449cb0c654be537c2a32';

export const fetchDataSpotify = {
    login: async (req, res) => {
        console.log('login');
        let params = {
            'client_id': client_id,
            'response_type': 'code',
            'scope': scopes,
            'redirect_uri': redirect_uri,
            'show_dialog': 'true'
        }
        const authurl = 'https://accounts.spotify.com/authorize?' + querystring.stringify(params);
        res.redirect(authurl);
    },
    callback: async (req, res) => {
        console.log(req.args.code);

        res.send('callback');
    }
}
