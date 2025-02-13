
import { authenticate } from "../shopify.server.js";

export async function loader({ request }) {
    const { session, admin } = await authenticate.admin(request);
console.log('test');
    try {
        // Inject a script into the Order Status Page (Thank You Page)
        const response = await admin.rest.post({
            path: "script_tags",
            data: {
                script_tag: {
                    event: "onload",
                    src: "https://your-server.com/redirect-script.js", // Change to your script URL
                    display_scope: "order_status",
                },
            },
        });

        return json({ success: true, response });
    } catch (error) {
        return json({ success: false, error: error.message });
    }
}
