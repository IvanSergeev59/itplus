import React from "react";
import { ItplusServiceConsumer } from "../itplus-service-context/itplus-service-context";

const withItplusService = () => (Wrapped) => {
    return (props) => {
        return (
            <ItplusServiceConsumer>
                {
                    (itplusService) => {
                        return (<Wrapped {...props}
                            itplusService={itplusService} />)
                    }
                }
            </ItplusServiceConsumer>
        )
    }
}

export default withItplusService