class Action extends React.Component {

    constructor(props) {
        super(props);
        this.state = {actions : [{action: "Action", time: "Time"}]};
        this.press = this.press.bind(this);
    }

    componentDidMount() {
        this.timerId = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    tick() {
        var rows = document.getElementById("table").getElementsByTagName("tr");
        this.checkActions(rows);
    }

    checkActions(check) {
        var date = new Date();
        var column;
        var hours = date.getHours();

        for (var i = 1; i < check.length; ++i) {
            column = check[i].getElementsByTagName("td")[1].innerText;
            column = +column;

            if (column == hours | column + 1 == hours | column + 2 == hours) {
                check[i].className = "green";
            }

            if (column > hours) {
                check[i].className = "gray";
            }

            if (column + 2 < hours) {
                check[i].className = "red";
            }
        };
    }

    press() {
        var dateTimePicker = document.getElementById("localdate").value;          

        if (dateTimePicker == "") {
            alert("Please, enter a datetime");
            return;
        }

        var text = document.getElementById("action").value;

        if (text == "") {
            alert("Please, enter an action");
            return;
        }
        var hoursFromDateTime = new Date(dateTimePicker).getHours();
        var arrayActions = [...this.state.actions];
        var actionObj = {action: text, time: hoursFromDateTime};
        arrayActions.push(actionObj);
        this.setState(() => ({
            actions: arrayActions
        }));
        var table = document.getElementById("table");
        var date = new Date();
        var hours = date.getHours();
    }

    render() {
        return <div>
            <input type="text" id="action" placeholder="Enter an action" name="text" />
            <input type="datetime-local" id="localdate" name="date" />
            <input type="button" onClick={this.press} id="button" name="button" value="Add" />
            <table id="table" border>
                {this.state.actions.map(x => (<tr>
                    <td>{x.action}</td>
                    <td>{x.time}</td>
                </tr>))}
            </table>
        </div>

    }
}

ReactDOM.render(
    <Action />,
    document.getElementById("app")
)