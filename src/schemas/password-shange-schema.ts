import * as yup from "yup";
import { PASSWORD_POLICY } from "../../src/constants";

export const passwordChangeSchema = yup.object({
  oldPassword: yup.string().required("Old password is required"),

  newPassword: yup
    .string()
    .required("New password is required")
    .min(
      PASSWORD_POLICY.MIN_LENGTH,
      `Password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters long`,
    )

    .test(
      "uppercase",
      "Password must include at least one uppercase letter (A-Z)",
      (value) => {
        if (!PASSWORD_POLICY.REQUIRE_UPPERCASE || !value) return true;
        return /[A-Z]/.test(value);
      },
    )

    .test(
      "digit",
      "Password must include at least one digit (0-9)",
      (value) => {
        if (!PASSWORD_POLICY.REQUIRE_DIGIT || !value) return true;
        return /\d/.test(value);
      },
    )

    .test(
      "not-same",
      "New password cannot be the same as your old password",
      function (value) {
        const { oldPassword } = this.parent;
        return value !== oldPassword;
      },
    ),
});
