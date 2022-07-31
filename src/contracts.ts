type BaseOptions = {
	coin?: string;
	nethash?: string;
};

type TransferOptions = {
	memo?: string;
	amount?: number;
} & BaseOptions;

type GenerateTransferOptions = {
	recipient?: string;
	method?: string;
} & TransferOptions;

export type { BaseOptions, GenerateTransferOptions, TransferOptions };
