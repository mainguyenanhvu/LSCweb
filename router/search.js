var express = require('express')
var fs = require('fs')
var router = express.Router()

router.post('/', async (req, res) => {
    var data = fs.readFileSync(__dirname + '/../mock_results/results.txt', 'utf-8');
    res.json(JSON.stringify(data.split('\n')));
});

router.get('/annotation', (req, res) => {
    var filenames = readFilenamesInDir(__dirname + '/../mock_results/annotation');
    var answer = fs.readFileSync(__dirname + '/../mock_results/answer/Q2.txt', 'utf-8');
    answer = answer.split('\n').sort().map((ans) => {
        return ans.split(',')[1];
    });
    filenames.sort();
    // filenames.sort((a, b) => a > b ? -1 : 1);
    var list_filenames = []
    filenames.forEach(filename => {
        var data = fs.readFileSync(__dirname + '/../mock_results/annotation/' + filename, 'utf-8');
        tmp = data.split('\n').sort();
        tmp = tmp.filter(t => (t.includes('jpg') || t.includes('JPG')) && (t[0] == '2' || t[0].toUpperCase() == 'B'));
        list_filenames.push({
            'dir': filename.split('.')[0],
            'filenames': tmp.map((f_name) => {
                // console.log(f_name);
                value = f_name;
                date = parseInt(value[0]) ? value.split('_')[0] : value.split('_')[2];
                time = parseInt(value[0]) ? value.split('_')[1] : value.split('_')[3];
                date = date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6);
                time = time.substring(0, 2) + ':' + time.substring(2, 4) + ':' + time.substring(4, 6);
                // return {
                //     'id': imgPath,
                //     'date': date,
                //     'time': time,
                //     'weekday': getWeekday(date),
                //     'path': imgPath
                // }

                return {
                    'name': f_name,
                    'time': getWeekday(date) + ' ' + time,
                    'inanswer': answer.includes(f_name) ? 'true' : '',
                }
            }),
        });
    });
    res.json(JSON.stringify(list_filenames));
});

var getWeekday = function (date) {
    switch (new Date(date).getDay()) {
        case 0:
            return "Sun";
        case 1:
            return "Mon";
        case 2:
            return "Tue";
        case 3:
            return "Wed";
        case 4:
            return "Thu";
        case 5:
            return "Fri";
        default:
            return "Sat";
    }
}

var readFilenamesInDir = function (dir) {
    var filenames = fs.readdirSync(dir);
    return filenames;
}

module.exports = router;