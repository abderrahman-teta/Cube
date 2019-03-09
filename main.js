var serialport = require('serialport');
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function wirteToPort(message,phone_no){
    let serial = new serialport('COM10', {
           baudRate:9600,
           autoOpen:false
       });
       
     await  serial.open(err => {
             if (err)  console.log(err);
             serial.write("AT+CMGF=1");
             serial.write('\r');
             serial.write("AT+CMGS=\"");
             serial.write(phone_no);
             serial.write('"')
             serial.write('\r');
             serial.write(message); 
             sleep(500);
             serial.write(Buffer([0x1A]));
             serial.write('^z');
             sleep(500);
        });
           
           
}
var numbers = ["0666849274"];
numbers.forEach(number=>{
  wirteToPort("teta2",number);
})

