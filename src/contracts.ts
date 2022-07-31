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

type GenerateVoteOptions = {
	delegate?: string;
	method?: Methods.Vote;
} & BaseOptions;

export type {
	BaseOptions,
	GenerateMessageSignOptions,
	GenerateTransferOptions,
	MessageSignOptions,
	TransferOptions,
	GenerateVoteOptions,
};
