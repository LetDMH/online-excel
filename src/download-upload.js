var myfile = document.getElementById('myfile')
var lab = document.getElementsByClassName('lab')[0]
var btn = document.getElementById('btn')
var reader = new FileReader()
var data, workbook, dropFile, jsonFile
myfile.addEventListener('change', upload)
lab.addEventListener('drop', drop)
lab.addEventListener('dragover', drag1)
lab.addEventListener('dragleave', drag2)
btn.addEventListener('click', () => {
  if (myfile.files.length === 0 && !dropFile) {
    alert('请先上传文件')
    return
  }
  var wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' }
  console.log(XLSX.write(workbook, wopts))
  download(
    toArrayBuffer(XLSX.write(workbook, wopts)),
    myfile.files.length === 0 ? dropFile.name : myfile.files[0].name
  )
})
function createReader(file) {
  reader.readAsBinaryString(file)
  reader.onload = function (e) {
    data = e.target.result
    workbook = XLSX.read(data, { type: 'binary' })
    jsonFile = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
    // document.getElementById('demo').innerHTML = XLSX.utils.sheet_to_html(
    //   workbook.Sheets[workbook.SheetNames[0]]
    // )
  }
  console.log(file)
  LuckyExcel.transformExcelToLucky(
    file,
    function (exportJson, luckysheetfile) {
      if (exportJson.sheets == null || exportJson.sheets.length == 0) {
        alert(
          'Failed to read the content of the excel file, currently does not support xls files!'
        )
        return
      }
      window.luckysheet.destroy()

      window.luckysheet.create({
        container: 'table',
        lang: 'zh',
        showinfobar: false,
        data: exportJson.sheets,
        title: exportJson.info.name,
        userInfo: exportJson.info.name.creator
      })
    }
  )
}
function drag1(e) {
  e.preventDefault()
  lab.style.borderColor = 'red'
  lab.style.opacity = 0.5
}
function drag2(e) {
  e.preventDefault()
  lab.style.borderColor = 'black'
  lab.style.opacity = 1
}
function drop(e) {
  e.stopPropagation()
  e.preventDefault()
  lab.style.borderColor = 'black'
  lab.style.opacity = 1
  dropFile = e.dataTransfer.files[0]
  createReader(dropFile)
}
//上传
function upload() {
  createReader(myfile.files[0])
}
//下载
function download(content, filename) {
  var a = document.createElement('a')
  var blob = new Blob([content], { type: 'application/octet-stream' })
  console.log(blob, URL.createObjectURL(blob))
  a.href = URL.createObjectURL(blob) //通过二进制数据返回带有hash的url地址
  a.download = filename //H5新特性，有了它就可以下载文件
  a.click() //模拟点击
  setTimeout(() => URL.revokeObjectURL(blob), 1000) //释放内存
}
//将内容转换成ArrayBuffer
function toArrayBuffer(content) {
  if (typeof ArrayBuffer !== 'undefined') {
    var buf = new ArrayBuffer(content.length)
    var view = new Uint8Array(buf)
    for (var i = 0; i != content.length; ++i)
      view[i] = content.charCodeAt(i) & 0xff
    return buf
  } else {
    var buf = new Array(content.length)
    for (var i = 0; i != content.length; ++i)
      buf[i] = content.charCodeAt(i) & 0xff
    return buf
  }
}
