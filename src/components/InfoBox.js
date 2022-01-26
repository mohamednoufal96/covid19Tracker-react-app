import { Card, Typography, CardContent } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import React from "react";
import "../styles/InfoBox.css";

function InfoBox({ title, cases, total, active, isRed, ...props }) {
    return (
        <Card className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"} `} onClick={props.onClick}>
            <CardContent>
                <Typography className="infoBox__title" style={{ fontWeight: 600 }} color="textSecondary">
                    {title}
                </Typography>
                <h3 className={`infoBox__cases  ${!isRed && "infoBox__cases--green"}`}>{cases} </h3>
                <Typography className="infoBox__total" style={{ fontWeight: 600 }} color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    );
}

export default InfoBox;
