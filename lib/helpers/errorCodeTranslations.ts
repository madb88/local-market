type SupaBaseErrorCodesT = {
	[key: string]: { message: string };
};

export const supabaseErrorCode: SupaBaseErrorCodesT = {
	Forbidden: { message: "Zakazane" },
};
