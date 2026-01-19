const { z } = require("zod");

exports.updateRoleSchema = z.object({
    params: z.object({
        id: z.string().min(1, "User ID required")
    }),
    body: z.object({
        role: z.enum(["user", "admin"], {
            errorMap: () => ({ message: "Role must be user or admin" })
        })
    })
});
