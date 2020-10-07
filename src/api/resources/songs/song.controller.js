export default class SongsController {
    static getSongs(req, res) {
        console.log('object');
        res.send('TO DO LIST ALL SONGS');
    }
    static postSongs(req, res) {
        res.send('TODO ADD SONGS');
    }
}
