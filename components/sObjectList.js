'use strict';

const e = React.createElement;

class sObjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sObjects: [
        'Account',
        'Contact',
        'Contract',
       ' Opportunity'
    ] };
  }

  render() {
    // var uno = this.state.sObjects[0];
    // return (
    //   <li>{this.state.sObjects[0].name}</li>
    // );
      var items = [];
      var sobjs = this.state.sObjects;

      for(var i=0; i<sobjs.length; i++) {
        if(sobjs[i].keyPrefix != null) {
          items.push(<li className="list-group-item" key={i}>
            <h3>{sobjs[i].label}</h3>
            {sobjs[i].name} | {sobjs[i].keyPrefix} | {sobjs[i].custom.toString()}
            </li>)
        }
      }
      
      return items;
  }

  componentDidMount() {
    fetch(
        'https://wanacom-dev-ed.my.salesforce.com/services/data/v46.0/sobjects',
        {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer 00Dj0000001sjCI!ARQAQLUkO.iyuuFlN2lMCXQvPhmYVNoKNlJIgSLwOm75I2WfcOMxVDb_ngkiDmtUjMo65ZWMUt0spoOtHlib6q1er8GNhR80',
                'Access-Control-Allow-Origin': '*.salesforce.com'
            })
        }
    )
    .then(res => res.json())
    .then((data) => {
        console.log(data.sobjects.length);
        this.setState({ sObjects:data.sobjects })
    })
    .catch(console.log);
}
}

const domContainer = document.querySelector('#sObjectList');
ReactDOM.render(e(sObjectList), domContainer);