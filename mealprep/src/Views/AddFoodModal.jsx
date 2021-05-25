import React from "react";
import "../Stylings/AddFoodModalStylings.css"

export default class AddFoodModal extends React.Component {

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div class="modal" id="modal">
        <h2>Modal Window</h2>
        <div class="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet bibendum eros. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris finibus consectetur lectus mattis dignissim. Integer nec laoreet felis. Quisque vitae felis eget elit lobortis posuere eget ac nisi. Mauris pellentesque ante sed magna ultrices finibus. Mauris eget laoreet nibh. Mauris a massa nec orci mollis viverra at vitae nisl. Suspendisse potenti. Donec laoreet consequat nunc nec feugiat. Sed volutpat ornare urna, vulputate vestibulum lacus scelerisque sit amet.

Sed a leo tellus. Sed ut varius leo. Nunc ut erat sed eros porta aliquet. Integer dapibus finibus lobortis. Integer porttitor nisl nec dui condimentum, nec mattis ante vestibulum. Aenean pharetra mauris ut elit molestie, commodo suscipit nulla pulvinar. Nullam consequat metus vel ante vestibulum, sed rhoncus ligula aliquam. Mauris venenatis vulputate dignissim. Vivamus vel leo non purus blandit suscipit. Vivamus viverra pulvinar eros at accumsan. Nam in ligula scelerisque, mattis ipsum sagittis, sodales ex. Sed maximus at felis ac porta. Mauris varius non urna eu convallis.

Nulla luctus quam placerat eros mattis, ac aliquam sem luctus. Nullam pretium suscipit ipsum non euismod. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed sollicitudin, risus in condimentum faucibus, sapien lacus ornare est, nec varius elit purus ac ipsum. Suspendisse accumsan bibendum tincidunt. Aenean ullamcorper ullamcorper nulla quis egestas. Etiam est ex, eleifend eget pulvinar ac, luctus in eros. Aliquam non ex aliquet, pharetra lorem non, volutpat libero. Vestibulum mollis nisi in commodo facilisis. Aenean et est ac nisi dictum cursus. Vestibulum quis velit lectus. Ut eget dui interdum, imperdiet justo non, volutpat felis. Nunc imperdiet felis risus, nec dignissim neque vulputate id. Cras sed aliquet quam, posuere volutpat velit.

Maecenas elit ligula, malesuada rhoncus porttitor laoreet, rhoncus nec ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut tellus et orci faucibus ultrices. Aenean vestibulum vel magna in pharetra. Donec condimentum purus ac purus porttitor congue. Duis elit libero, sagittis non nisi a, finibus hendrerit nunc. Vivamus eu lectus in dolor bibendum consequat. Aliquam a magna non diam aliquet aliquam. Praesent hendrerit justo tellus, vel sodales lorem placerat vel. Cras id mollis orci, nec egestas odio. Etiam volutpat dolor tellus, egestas tristique orci elementum sit amet. Nunc sit amet condimentum nisi. Fusce a nulla massa. Quisque fringilla, metus vel eleifend elementum, lacus purus porta neque, in efficitur diam tellus sed libero.

Sed eu ultrices nunc, quis suscipit urna. Maecenas laoreet justo id tellus vestibulum accumsan. In at condimentum erat, quis hendrerit dui. Donec non tempus odio. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam ut lectus convallis, rutrum eros sed, placerat erat. In id cursus ligula. Vestibulum non pharetra odio, et cursus orci.

Cras varius odio elit, eget efficitur nulla feugiat placerat. Pellentesque at molestie justo. In tortor ipsum, elementum ut lacus vel, gravida aliquam dui. Nulla sollicitudin non erat vel varius. Nullam diam dolor, commodo et neque nec, condimentum imperdiet elit. Curabitur vitae tincidunt leo. Aliquam convallis nisl ac quam consequat vehicula. Curabitur erat dolor, interdum eu eros sed, laoreet tempus justo. In hac habitasse platea dictumst. Duis porta sollicitudin velit eu ullamcorper. Curabitur a quam tempus, vestibulum libero eget, viverra nisl. Proin semper felis et orci pretium luctus ut vel neque. Nullam venenatis, leo non ullamcorper mollis, ligula urna vestibulum ligula, at egestas felis purus ut metus. Vestibulum congue, purus vitae imperdiet ornare, ipsum risus pellentesque justo, ut tempor ipsum lacus id orci.

Aenean erat diam, mattis laoreet justo non, fringilla ultrices turpis. Fusce rutrum vehicula justo ut euismod. Vivamus posuere scelerisque orci, at vulputate purus rutrum a. Integer vel elementum ante. Phasellus sit amet nibh imperdiet urna efficitur tincidunt. Aliquam convallis, arcu vitae tempor scelerisque, lorem dui pharetra erat, vitae sodales lacus neque sit amet tortor. Pellentesque pulvinar in ex nec efficitur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam suscipit pellentesque dolor ut ornare. Ut iaculis vitae dui sit amet iaculis. Pellentesque porta maximus nisl ut efficitur. Duis at porttitor erat. Donec sit amet sollicitudin nulla, in varius arcu. Nam dui mauris, dignissim et vehicula non, iaculis ac orci.

Quisque viverra augue sit amet varius ullamcorper. Mauris elementum tempor placerat. In hac habitasse platea dictumst. Curabitur accumsan et eros vitae molestie. Aenean porta, lorem ac dictum euismod, erat augue sagittis tortor, id dignissim metus lorem at ex. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla odio odio, mollis sed fringilla sed, malesuada nec justo.

Praesent vel interdum felis, venenatis ultrices ex. Pellentesque urna dolor, feugiat vitae pharetra quis, pellentesque ut elit. In efficitur pretium sem, eget aliquam erat hendrerit ut. In nisl enim, tempus id lectus non, elementum hendrerit libero. Praesent auctor maximus ullamcorper. Pellentesque molestie enim odio, quis dignissim sapien facilisis convallis. In non porta dui. Mauris ut dolor laoreet, feugiat urna ac, maximus arcu. Ut lacinia iaculis risus ac aliquet. Aliquam augue nunc, sollicitudin at posuere ut, commodo quis mi. Suspendisse ornare tincidunt nisl at feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas aliquet vestibulum lacus, euismod sodales libero pellentesque vulputate.

Vivamus dolor risus, fermentum eget tellus nec, pretium volutpat augue. Vestibulum neque dui, sagittis at arcu et, scelerisque luctus nulla. Donec interdum est non neque condimentum, ac accumsan urna maximus. Phasellus eleifend aliquam justo nec tempus. Aenean tristique bibendum justo et ultrices. Aliquam faucibus aliquam nulla, nec varius lacus tempus id. Donec a est ac tellus vestibulum dapibus vel vitae mauris. Vivamus at porttitor metus. Donec vitae lorem quis urna feugiat hendrerit aliquet eget eros. Nulla at ante pharetra, posuere urna eget, cursus sapien. Morbi tincidunt ex ut ornare placerat.
            </div>
        <div class="actions">
          <button class="toggle-button" onClick={this.props.onClose}>
            close
          </button>
        </div>
      </div>
    );
  }
}