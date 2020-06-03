var express = require('express')
var fs = require('fs')
var router = express.Router()

router.post('/', async (req, res)  =>  {
    var data = fs.readFileSync(__dirname + '/../mock_results/results.txt', 'utf-8');
    res.json(JSON.stringify(data.split('\n')));
});

router.get('/annotation', (req, res) => {
    var filenames = readFilenamesInDir(__dirname + '/../mock_results/annotation');
    var answer = fs.readFileSync(__dirname + '/../mock_results/answer/Q2.txt', 'utf-8');
    answer = answer.split('\n').sort().map((ans)=> {
        return ans.split(',')[1];
    });
    filenames.sort();
    // filenames.sort((a, b) => a > b ? -1 : 1);
    var list_filenames = []
    filenames.forEach(filename => {
        var data = fs.readFileSync(__dirname + '/../mock_results/annotation/' + filename, 'utf-8');
        tmp = data.split('\n').sort();
        list_filenames.push({
            'dir': filename.split('.')[0],
            'filenames': tmp.map((f_name)=> {
                return {
                    'name': f_name,
                    'time': f_name.split('_').pop().split('.')[0],
                    'inanswer': answer.includes(f_name) ? 'true': ''
                }
            }),
        });
    });
    res.json(JSON.stringify(list_filenames));
});

var readFilenamesInDir = function (dir) {
    var filenames = fs.readdirSync(dir);
    return filenames;
}

module.exports = router;