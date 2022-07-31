import { Methods } from "./enums";

type BaseOptions = {
	coin?: string;
	nethash?: string;
};

type TransferOptions = {
	memo?: string;
	amount?: number;
} & BaseOptions;

type MessageSignOptions = {
	message?: string;
} & BaseOptions;

type GenerateTransferOptions = {
	recipient?: string;
	method?: Methods.Transfer;
} & TransferOptions;

type GenerateMessageSignOptions = {
	address?: string;
	method?: Methods.Sign;
} & MessageSignOptions;

export type { BaseOptions, GenerateMessageSignOptions, GenerateTransferOptions, MessageSignOptions, TransferOptions };
