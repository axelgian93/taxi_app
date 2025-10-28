// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'payments_trip_id_refunds_get200_response_items_inner.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$PaymentsTripIdRefundsGet200ResponseItemsInner
    extends PaymentsTripIdRefundsGet200ResponseItemsInner {
  @override
  final String? id;
  @override
  final String? paymentId;
  @override
  final String? tripId;
  @override
  final num? amountUsd;
  @override
  final String? reason;
  @override
  final String? provider;
  @override
  final String? externalId;
  @override
  final DateTime? createdAt;

  factory _$PaymentsTripIdRefundsGet200ResponseItemsInner(
          [void Function(PaymentsTripIdRefundsGet200ResponseItemsInnerBuilder)?
              updates]) =>
      (PaymentsTripIdRefundsGet200ResponseItemsInnerBuilder()..update(updates))
          ._build();

  _$PaymentsTripIdRefundsGet200ResponseItemsInner._(
      {this.id,
      this.paymentId,
      this.tripId,
      this.amountUsd,
      this.reason,
      this.provider,
      this.externalId,
      this.createdAt})
      : super._();
  @override
  PaymentsTripIdRefundsGet200ResponseItemsInner rebuild(
          void Function(PaymentsTripIdRefundsGet200ResponseItemsInnerBuilder)
              updates) =>
      (toBuilder()..update(updates)).build();

  @override
  PaymentsTripIdRefundsGet200ResponseItemsInnerBuilder toBuilder() =>
      PaymentsTripIdRefundsGet200ResponseItemsInnerBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is PaymentsTripIdRefundsGet200ResponseItemsInner &&
        id == other.id &&
        paymentId == other.paymentId &&
        tripId == other.tripId &&
        amountUsd == other.amountUsd &&
        reason == other.reason &&
        provider == other.provider &&
        externalId == other.externalId &&
        createdAt == other.createdAt;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, id.hashCode);
    _$hash = $jc(_$hash, paymentId.hashCode);
    _$hash = $jc(_$hash, tripId.hashCode);
    _$hash = $jc(_$hash, amountUsd.hashCode);
    _$hash = $jc(_$hash, reason.hashCode);
    _$hash = $jc(_$hash, provider.hashCode);
    _$hash = $jc(_$hash, externalId.hashCode);
    _$hash = $jc(_$hash, createdAt.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(
            r'PaymentsTripIdRefundsGet200ResponseItemsInner')
          ..add('id', id)
          ..add('paymentId', paymentId)
          ..add('tripId', tripId)
          ..add('amountUsd', amountUsd)
          ..add('reason', reason)
          ..add('provider', provider)
          ..add('externalId', externalId)
          ..add('createdAt', createdAt))
        .toString();
  }
}

class PaymentsTripIdRefundsGet200ResponseItemsInnerBuilder
    implements
        Builder<PaymentsTripIdRefundsGet200ResponseItemsInner,
            PaymentsTripIdRefundsGet200ResponseItemsInnerBuilder> {
  _$PaymentsTripIdRefundsGet200ResponseItemsInner? _$v;

  String? _id;
  String? get id => _$this._id;
  set id(String? id) => _$this._id = id;

  String? _paymentId;
  String? get paymentId => _$this._paymentId;
  set paymentId(String? paymentId) => _$this._paymentId = paymentId;

  String? _tripId;
  String? get tripId => _$this._tripId;
  set tripId(String? tripId) => _$this._tripId = tripId;

  num? _amountUsd;
  num? get amountUsd => _$this._amountUsd;
  set amountUsd(num? amountUsd) => _$this._amountUsd = amountUsd;

  String? _reason;
  String? get reason => _$this._reason;
  set reason(String? reason) => _$this._reason = reason;

  String? _provider;
  String? get provider => _$this._provider;
  set provider(String? provider) => _$this._provider = provider;

  String? _externalId;
  String? get externalId => _$this._externalId;
  set externalId(String? externalId) => _$this._externalId = externalId;

  DateTime? _createdAt;
  DateTime? get createdAt => _$this._createdAt;
  set createdAt(DateTime? createdAt) => _$this._createdAt = createdAt;

  PaymentsTripIdRefundsGet200ResponseItemsInnerBuilder() {
    PaymentsTripIdRefundsGet200ResponseItemsInner._defaults(this);
  }

  PaymentsTripIdRefundsGet200ResponseItemsInnerBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _id = $v.id;
      _paymentId = $v.paymentId;
      _tripId = $v.tripId;
      _amountUsd = $v.amountUsd;
      _reason = $v.reason;
      _provider = $v.provider;
      _externalId = $v.externalId;
      _createdAt = $v.createdAt;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(PaymentsTripIdRefundsGet200ResponseItemsInner other) {
    _$v = other as _$PaymentsTripIdRefundsGet200ResponseItemsInner;
  }

  @override
  void update(
      void Function(PaymentsTripIdRefundsGet200ResponseItemsInnerBuilder)?
          updates) {
    if (updates != null) updates(this);
  }

  @override
  PaymentsTripIdRefundsGet200ResponseItemsInner build() => _build();

  _$PaymentsTripIdRefundsGet200ResponseItemsInner _build() {
    final _$result = _$v ??
        _$PaymentsTripIdRefundsGet200ResponseItemsInner._(
          id: id,
          paymentId: paymentId,
          tripId: tripId,
          amountUsd: amountUsd,
          reason: reason,
          provider: provider,
          externalId: externalId,
          createdAt: createdAt,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
