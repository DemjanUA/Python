const canvas = document.getElementById("canvas");
const uploadInput = document.getElementById("upload");

const context = canvas.getContext("2d");
const _height = 280;
const _width = 280;

let imageScale = 0.7;


uploadInput.addEventListener("change", function (e) {
  if (e.target.files && _.first(e.target.files)) {
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      const img = new Image();
      img.addEventListener("load", function () {
        context.drawImage(img,
          _width / 2 - img.width * imageScale / 2,
          _height / 2 - img.height * imageScale / 2,
          img.width * imageScale,
          img.height * imageScale
        );

        // --------------
        var outputContext = document.getElementById("output_canvas").getContext("2d");
        var imageData = context.getImageData(0, 0, _width, _height);
        var data = imageData.data;
        var arraylength = _width * _height * 4;
        for (var i=arraylength-1; i>0;i-=4) {
          //R= i-3, G = i-2 and B = i-1
          //Get our gray shade using the formula
          var gray = 0.3 * data[i-3] + 0.59 * data[i-2] + 0.11 * data[i-1];
          //Set our 3 RGB channels to the computed gray.
          data[i-3] = gray;
          data[i-2] = gray;
          data[i-1] = gray;
        }
        outputContext.putImageData(imageData, 0, 0);
        // --------------


        // --------------
        var outputContext28 = document.getElementById("output_28_canvas").getContext("2d");
        const img28 = new Image();
        outputContext28.drawImage(document.getElementById("output_canvas"), 0, 0, _width / 10, _height / 10);
        // img28.addEventListener("load", function () {
        // });
        // --------------

      });
      img.src = e.target.result;
    };
    fileReader.readAsDataURL(this.files[0]);
  }
});

console.log(context)