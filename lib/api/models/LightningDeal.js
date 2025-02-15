"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DealState;
(function (DealState) {
    DealState[DealState["AVAILABLE"] = 0] = "AVAILABLE";
    DealState[DealState["UPCOMING"] = 1] = "UPCOMING";
    DealState[DealState["WAITLIST"] = 2] = "WAITLIST";
    DealState[DealState["SOLDOUT"] = 3] = "SOLDOUT";
    DealState[DealState["WAITLISTFULL"] = 4] = "WAITLISTFULL";
    DealState[DealState["EXPIRED"] = 5] = "EXPIRED";
    DealState[DealState["SUPPRESSED"] = 6] = "SUPPRESSED";
})(DealState || (DealState = {}));
