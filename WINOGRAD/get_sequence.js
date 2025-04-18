// get_sequence.js

// get_sequence.js
function getSequence() {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "php/get_sequence.php", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            try {
              var response = JSON.parse(xhr.responseText);
              // Parse JSON strings into arrays:
              response.encoding_sequence = JSON.parse(response.encoding_sequence);
              response.recognition_sequence = JSON.parse(response.recognition_sequence);
              response.semantic_diff_sequence = JSON.parse(response.semantic_diff_sequence);
              response.rwt_sequence = JSON.parse(response.rwt_sequence);
              resolve(response);
            } catch (e) {
              reject("Error parsing server response: " + e);
            }
          } else {
            reject("HTTP error: " + xhr.status);
          }
        }
      };
      xhr.send("x=" + encodeURIComponent(JSON.stringify({})));
    });
  }
  