type BaseOptions = {
	coin?: string;
	nethash?: string;
	method?: string;
};

type TransferOptions = {
	recipient?: string;
	memo?: string;
	amount?: number;
} & BaseOptions;

export type { BaseOptions, TransferOptions };
