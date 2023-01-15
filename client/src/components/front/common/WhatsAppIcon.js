
/**
 * 
 * Also see
 * https://www.npmjs.com/package/react-floating-whatsapp
 * 
 */
import { FloatingWhatsApp } from 'react-floating-whatsapp'

const WhatsAppIcon = () => {
    return (
        <FloatingWhatsApp
            phoneNumber={'+8801676736430'}
            accountName="Mind To Heart"
            avatar="assets/front/images/mindtoheart_logo.jpg"
            statusMessage="Psychological Wellness Center"
        />
    )
}
export default WhatsAppIcon;