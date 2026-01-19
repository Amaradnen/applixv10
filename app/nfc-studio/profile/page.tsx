import StudioLayout from "../components/StudioLayout";
import ProfileControls from "../components/controls/ProfileControls";
import MobilePreview from "../components/preview/MobilePreview";

export default function ProfilePage() {
    return (
        <StudioLayout
            controls={<ProfileControls />}
            preview={<MobilePreview />}
        />
    );
}
