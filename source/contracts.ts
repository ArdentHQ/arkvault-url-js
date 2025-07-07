import { Methods } from "./enums";

interface SignedMessage {
	signatory: string;
	message: string;
	signature: string;
}

type BaseOptions = {
	nethash?: string;
};

type TransferOptions = {
	memo?: string;
	amount?: number;
} & BaseOptions;

type MessageSignOptions = {
	address?: string;
} & BaseOptions;

type MessageVerifyOptions = {} & BaseOptions;

type GenerateTransferOptions = {
	recipient?: string;
	method?: Methods.Transfer;
} & TransferOptions;

type GenerateMessageSignOptions = {
	message?: string;
	method?: Methods.Sign;
} & MessageSignOptions;

type GenerateMessageVerifyOptions = {
	message?: string;
	signatory?: string;
	signature?: string;
	method?: Methods.Verify;
} & MessageVerifyOptions;

type GenerateUsernameOptions = {
	username: string;
	method?: Methods.Username;
} & BaseOptions;

type GenerateVoteOptions = {
	validator?: string;
	username?: string;
	method?: Methods.Vote;
} & BaseOptions;

export type {
	BaseOptions,
	GenerateMessageSignOptions,
	GenerateMessageVerifyOptions,
	GenerateTransferOptions,
	GenerateUsernameOptions,
	GenerateVoteOptions,
	MessageSignOptions,
	MessageVerifyOptions,
	SignedMessage,
	TransferOptions,
};
