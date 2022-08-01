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
	address?: string;
} & BaseOptions;

type GenerateTransferOptions = {
	recipient?: string;
	method?: Methods.Transfer;
} & TransferOptions;

type GenerateMessageSignOptions = {
	message?: string;
	method?: Methods.Sign;
} & MessageSignOptions;

type GenerateVoteOptions = {
	delegate?: string;
	method?: Methods.Vote;
} & BaseOptions;

export type {
	BaseOptions,
	GenerateMessageSignOptions,
	GenerateTransferOptions,
	GenerateVoteOptions,
	MessageSignOptions,
	TransferOptions,
};
