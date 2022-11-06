
/**
 * 
 * Also see
 * https://www.npmjs.com/package/react-floating-whatsapp
 * 
 */

import WhatsAppWidget from "react-whatsapp-chat-widget";
import "react-whatsapp-chat-widget/index.css";

const WhatsAppIcon = () => {
    return (
        /**
         * https://www.npmjs.com/package/react-whatsapp-chat-widget
         */
        <WhatsAppWidget
            phoneNo="01676736430"
            position="right"
            widgetWidth="300px"
            widgetWidthMobile="260px"
            autoOpen={true}
            autoOpenTimer={5000}
            messageBox={true}
            messageBoxTxt="Hi Team, is there any related service available ?"
            iconSize="40"
            iconColor="white"
            iconBgColor="#4dc247"
            headerIcon="https://proficientdesigners.in/wp-content/themes/pd/img/logo-new.png"
            headerIconColor="#4dc247"
            headerTxtColor="black"
            headerBgColor="#4dc247"
            headerTitle="John Doe"
            headerCaption="Online"
            bodyBgColor="#bbb"
            chatPersonName="Support"
            chatMessage={<>Hi there 👋 <br /><br /> How can I help you?</>}
            footerBgColor="white"
            btnBgColor="#4dc247"
            btnTxtColor="white"
            btnTxt="Start Chat"
        />
    )
}
export default WhatsAppIcon;