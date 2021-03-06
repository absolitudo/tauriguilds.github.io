import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import { mapInstanceToPicture } from "./helpers";

function Progression(props) {
    let progression = [];

    for (let instance in props.progression) {
        let obj = { ...props.progression[instance], instanceName: instance };
        progression.push(obj);
    }

    return (
        <section className="progression">
            {progression.map((instance, index) => {
                return <Instance instance={instance} key={index} />;
            })}
        </section>
    );
}

class Instance extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({ open: !state.open }));
    }

    render() {
        let style = {
            background:
                "url(" +
                mapInstanceToPicture(this.props.instance.instanceName) +
                ")"
        };

        let bosses = [];

        for (let key in this.props.instance) {
            if (key !== "abbreviation" && key !== "instanceName") {
                bosses.push({
                    bossName: key,
                    defeated: this.props.instance[key]
                });
            }
        }

        return (
            <div className="progression-instance-container">
                <ListItem
                    button
                    onClick={this.handleClick}
                    className="progression-instance"
                    style={style}
                >
                    <ListItemText primary={this.props.instance.abbreviation} />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {bosses.map(boss => (
                            <Boss boss={boss} key={boss.bossName} />
                        ))}
                    </List>
                </Collapse>
            </div>
        );
    }
}

function Boss(props) {
    let secondaryText;
    if (props.boss.defeated) {
        secondaryText = new Date(
            props.boss.defeated * 1000
        ).toLocaleDateString();
    } else {
        secondaryText = "Alive";
    }

    let className = "boss-defeated " + (props.boss.defeated ? "green" : "red");

    return (
        <ListItem className="instance-boss-container">
            <ListItemText
                primary={props.boss.bossName}
                secondary={<span className={className}>{secondaryText}</span>}
            />
        </ListItem>
    );
}

export default Progression;
