import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const SocialLogin = () => {
    const{googleSignIN}=useContext(AuthContext);

    const handleGoogleSignIN=()=>{
        googleSignIN()
        .then(result=>{
            console.log(result.user);
        })
        .catch(error=>console.log(error));
    }
    return (
        <div>
            <div className="divider">OR</div>
            <div className="text-center">
                <button onClick={handleGoogleSignIN} className="btn btn-circle btn-outline">
                    G
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;