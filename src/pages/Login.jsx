import { Login as LoginComponent } from "../components";
import { motion } from "framer-motion";

function Login() {
  return (
    <motion.div
      className="min-h-[85vh] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <LoginComponent />
    </motion.div>
  );
}

export default Login;
