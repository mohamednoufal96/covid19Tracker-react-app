import { Card, Typography, CardContent } from "@material-ui/core";
import React from "react";
import "../styles/InfoBox.css";

function InfoBox({ title, cases, total }) {
    return (
        <Card className="infoBox">
            <CardContent>
                <Typography className="infoBox__title" style={{ fontWeight: 600 }} color="textSecondary">
                    {title}
                </Typography>
                <h3 className="infoBox__cases">{cases} cases</h3>
                <Typography className="infoBox__total" style={{ fontWeight: 600 }} color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    );
}

export default InfoBox;
