// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'payments_trip_id_refund_post_request.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$PaymentsTripIdRefundPostRequest
    extends PaymentsTripIdRefundPostRequest {
  @override
  final num? amountUsd;
  @override
  final String? reason;

  factory _$PaymentsTripIdRefundPostRequest(
          [void Function(PaymentsTripIdRefundPostRequestBuilder)? updates]) =>
      (PaymentsTripIdRefundPostRequestBuilder()..update(updates))._build();

  _$PaymentsTripIdRefundPostRequest._({this.amountUsd, this.reason})
      : super._();
  @override
  PaymentsTripIdRefundPostRequest rebuild(
          void Function(PaymentsTripIdRefundPostRequestBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  PaymentsTripIdRefundPostRequestBuilder toBuilder() =>
      PaymentsTripIdRefundPostRequestBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is PaymentsTripIdRefundPostRequest &&
        amountUsd == other.amountUsd &&
        reason == other.reason;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, amountUsd.hashCode);
    _$hash = $jc(_$hash, reason.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'PaymentsTripIdRefundPostRequest')
          ..add('amountUsd', amountUsd)
          ..add('reason', reason))
        .toString();
  }
}

class PaymentsTripIdRefundPostRequestBuilder
    implements
        Builder<PaymentsTripIdRefundPostRequest,
            PaymentsTripIdRefundPostRequestBuilder> {
  _$PaymentsTripIdRefundPostRequest? _$v;

  num? _amountUsd;
  num? get amountUsd => _$this._amountUsd;
  set amountUsd(num? amountUsd) => _$this._amountUsd = amountUsd;

  String? _reason;
  String? get reason => _$this._reason;
  set reason(String? reason) => _$this._reason = reason;

  PaymentsTripIdRefundPostRequestBuilder() {
    PaymentsTripIdRefundPostRequest._defaults(this);
  }

  PaymentsTripIdRefundPostRequestBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _amountUsd = $v.amountUsd;
      _reason = $v.reason;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(PaymentsTripIdRefundPostRequest other) {
    _$v = other as _$PaymentsTripIdRefundPostRequest;
  }

  @override
  void update(void Function(PaymentsTripIdRefundPostRequestBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  PaymentsTripIdRefundPostRequest build() => _build();

  _$PaymentsTripIdRefundPostRequest _build() {
    final _$result = _$v ??
        _$PaymentsTripIdRefundPostRequest._(
          amountUsd: amountUsd,
          reason: reason,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
