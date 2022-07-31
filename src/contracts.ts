type BaseOptions = {
	coin?: string;
	nethash?: string;
	method?: string;
};

type TransferOptions = {
	memo?: string;
	amount?: number;
} & BaseOptions;

type GenerateTransferOptions = {
	recipient?: string;
} & TransferOptions;

export type { BaseOptions, TransferOptions, GenerateTransferOptions };
