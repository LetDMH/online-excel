var table = document.getElementById('table')
var colHeaders = [] //<===handsontable列头显示值
var cols = 3 //<====handsontable列头显示值对应的实际字段与其他配置
var hotSettings = {
  //<====handsontable的配置
  colHeaders: colHeaders, //当值为true时显示列头，当值为数组时，列头为数组的值
  data: jsonFile, //数据源
  columns: cols, //列具体配置
  // width: 906,
  autoWrapRow: true,
  // height: 641,
  // maxRows: 22,
  minRows: 1,
  // currentRowClassName：当前行样式的名称,
  // currentColClassName：当前列样式的名称,
  manualColumnResize: true, //当值为true时，允许拖动，当为false时禁止拖动
  manualRowResize: true, //当值为true时，允许拖动，当为false时禁止拖动
  stretchH: 'all', //last:延伸最后一列,all:延伸所有列,none默认不延伸。
  manualColumnMove: true, // 当值为true时，列可拖拽移动到指定列
  manualRowMove: true, // 当值为true时，行可拖拽至指定行
  rowHeaders: true, //当值为true时显示行头，当值为数组时，行头为数组的值
  columnSorting: true, //允许排序
  sortIndicator: true,
  contextMenu: true, //显示右键菜单
  autoColumnSize: true, //当值为true且列宽未设置时，自适应列大小
  licenseKey: 'non-commercial-and-evaluation'
}
var hot = new Handsontable(table, hotSettings)
// console.log(hot)
