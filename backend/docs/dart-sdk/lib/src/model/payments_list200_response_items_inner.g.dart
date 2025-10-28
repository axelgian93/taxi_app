// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'payments_list200_response_items_inner.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

const PaymentsList200ResponseItemsInnerStatusEnum
    _$paymentsList200ResponseItemsInnerStatusEnum_PENDING =
    const PaymentsList200ResponseItemsInnerStatusEnum._('PENDING');
const PaymentsList200ResponseItemsInnerStatusEnum
    _$paymentsList200ResponseItemsInnerStatusEnum_AUTHORIZED =
    const PaymentsList200ResponseItemsInnerStatusEnum._('AUTHORIZED');
const PaymentsList200ResponseItemsInnerStatusEnum
    _$paymentsList200ResponseItemsInnerStatusEnum_PAID =
    const PaymentsList200ResponseItemsInnerStatusEnum._('PAID');
const PaymentsList200ResponseItemsInnerStatusEnum
    _$paymentsList200ResponseItemsInnerStatusEnum_FAILED =
    const PaymentsList200ResponseItemsInnerStatusEnum._('FAILED');
const PaymentsList200ResponseItemsInnerStatusEnum
    _$paymentsList200ResponseItemsInnerStatusEnum_REFUNDED =
    const PaymentsList200ResponseItemsInnerStatusEnum._('REFUNDED');

PaymentsList200ResponseItemsInnerStatusEnum
    _$paymentsList200ResponseItemsInnerStatusEnumValueOf(String name) {
  switch (name) {
    case 'PENDING':
      return _$paymentsList200ResponseItemsInnerStatusEnum_PENDING;
    case 'AUTHORIZED':
      return _$paymentsList200ResponseItemsInnerStatusEnum_AUTHORIZED;
    case 'PAID':
      return _$paymentsList200ResponseItemsInnerStatusEnum_PAID;
    case 'FAILED':
      return _$paymentsList200ResponseItemsInnerStatusEnum_FAILED;
    case 'REFUNDED':
      return _$paymentsList200ResponseItemsInnerStatusEnum_REFUNDED;
    default:
      throw ArgumentError(name);
  }
}

final BuiltSet<PaymentsList200ResponseItemsInnerStatusEnum>
    _$paymentsList200ResponseItemsInnerStatusEnumValues = BuiltSet<
        PaymentsList200ResponseItemsInnerStatusEnum>(const <PaymentsList200ResponseItemsInnerStatusEnum>[
  _$paymentsList200ResponseItemsInnerStatusEnum_PENDING,
  _$paymentsList200ResponseItemsInnerStatusEnum_AUTHORIZED,
  _$paymentsList200ResponseItemsInnerStatusEnum_PAID,
  _$paymentsList200ResponseItemsInnerStatusEnum_FAILED,
  _$paymentsList200ResponseItemsInnerStatusEnum_REFUNDED,
]);

Serializer<PaymentsList200ResponseItemsInnerStatusEnum>
    _$paymentsList200ResponseItemsInnerStatusEnumSerializer =
    _$PaymentsList200ResponseItemsInnerStatusEnumSerializer();

class _$PaymentsList200ResponseItemsInnerStatusEnumSerializer
    implements
        PrimitiveSerializer<PaymentsList200ResponseItemsInnerStatusEnum> {
  static const Map<String, Object> _toWire = const <String, Object>{
    'PENDING': 'PENDING',
    'AUTHORIZED': 'AUTHORIZED',
    'PAID': 'PAID',
    'FAILED': 'FAILED',
    'REFUNDED': 'REFUNDED',
  };
  static const Map<Object, String> _fromWire = const <Object, String>{
    'PENDING': 'PENDING',
    'AUTHORIZED': 'AUTHORIZED',
    'PAID': 'PAID',
    'FAILED': 'FAILED',
    'REFUNDED': 'REFUNDED',
  };

  @override
  final Iterable<Type> types = const <Type>[
    PaymentsList200ResponseItemsInnerStatusEnum
  ];
  @override
  final String wireName = 'PaymentsList200ResponseItemsInnerStatusEnum';

  @override
  Object serialize(Serializers serializers,
          PaymentsList200ResponseItemsInnerStatusEnum object,
          {FullType specifiedType = FullType.unspecified}) =>
      _toWire[object.name] ?? object.name;

  @override
  PaymentsList200ResponseItemsInnerStatusEnum deserialize(
          Serializers serializers, Object serialized,
          {FullType specifiedType = FullType.unspecified}) =>
      PaymentsList200ResponseItemsInnerStatusEnum.valueOf(
          _fromWire[serialized] ?? (serialized is String ? serialized : ''));
}

class _$PaymentsList200ResponseItemsInner
    extends PaymentsList200ResponseItemsInner {
  @override
  final String? id;
  @override
  final String? tripId;
  @override
  final num? amountUsd;
  @override
  final PaymentsList200ResponseItemsInnerStatusEnum? status;
  @override
  final String? method;
  @override
  final String? provider;
  @override
  final String? externalId;
  @override
  final DateTime? createdAt;
  @override
  final DateTime? updatedAt;
  @override
  final bool? isAuthorized;
  @override
  final bool? isPaid;
  @override
  final bool? isFailed;
  @override
  final String? providerDisplay;
  @override
  final bool? capturable;

  factory _$PaymentsList200ResponseItemsInner(
          [void Function(PaymentsList200ResponseItemsInnerBuilder)? updates]) =>
      (PaymentsList200ResponseItemsInnerBuilder()..update(updates))._build();

  _$PaymentsList200ResponseItemsInner._(
      {this.id,
      this.tripId,
      this.amountUsd,
      this.status,
      this.method,
      this.provider,
      this.externalId,
      this.createdAt,
      this.updatedAt,
      this.isAuthorized,
      this.isPaid,
      this.isFailed,
      this.providerDisplay,
      this.capturable})
      : super._();
  @override
  PaymentsList200ResponseItemsInner rebuild(
          void Function(PaymentsList200ResponseItemsInnerBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  PaymentsList200ResponseItemsInnerBuilder toBuilder() =>
      PaymentsList200ResponseItemsInnerBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is PaymentsList200ResponseItemsInner &&
        id == other.id &&
        tripId == other.tripId &&
        amountUsd == other.amountUsd &&
        status == other.status &&
        method == other.method &&
        provider == other.provider &&
        externalId == other.externalId &&
        createdAt == other.createdAt &&
        updatedAt == other.updatedAt &&
        isAuthorized == other.isAuthorized &&
        isPaid == other.isPaid &&
        isFailed == other.isFailed &&
        providerDisplay == other.providerDisplay &&
        capturable == other.capturable;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, id.hashCode);
    _$hash = $jc(_$hash, tripId.hashCode);
    _$hash = $jc(_$hash, amountUsd.hashCode);
    _$hash = $jc(_$hash, status.hashCode);
    _$hash = $jc(_$hash, method.hashCode);
    _$hash = $jc(_$hash, provider.hashCode);
    _$hash = $jc(_$hash, externalId.hashCode);
    _$hash = $jc(_$hash, createdAt.hashCode);
    _$hash = $jc(_$hash, updatedAt.hashCode);
    _$hash = $jc(_$hash, isAuthorized.hashCode);
    _$hash = $jc(_$hash, isPaid.hashCode);
    _$hash = $jc(_$hash, isFailed.hashCode);
    _$hash = $jc(_$hash, providerDisplay.hashCode);
    _$hash = $jc(_$hash, capturable.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'PaymentsList200ResponseItemsInner')
          ..add('id', id)
          ..add('tripId', tripId)
          ..add('amountUsd', amountUsd)
          ..add('status', status)
          ..add('method', method)
          ..add('provider', provider)
          ..add('externalId', externalId)
          ..add('createdAt', createdAt)
          ..add('updatedAt', updatedAt)
          ..add('isAuthorized', isAuthorized)
          ..add('isPaid', isPaid)
          ..add('isFailed', isFailed)
          ..add('providerDisplay', providerDisplay)
          ..add('capturable', capturable))
        .toString();
  }
}

class PaymentsList200ResponseItemsInnerBuilder
    implements
        Builder<PaymentsList200ResponseItemsInner,
            PaymentsList200ResponseItemsInnerBuilder> {
  _$PaymentsList200ResponseItemsInner? _$v;

  String? _id;
  String? get id => _$this._id;
  set id(String? id) => _$this._id = id;

  String? _tripId;
  String? get tripId => _$this._tripId;
  set tripId(String? tripId) => _$this._tripId = tripId;

  num? _amountUsd;
  num? get amountUsd => _$this._amountUsd;
  set amountUsd(num? amountUsd) => _$this._amountUsd = amountUsd;

  PaymentsList200ResponseItemsInnerStatusEnum? _status;
  PaymentsList200ResponseItemsInnerStatusEnum? get status => _$this._status;
  set status(PaymentsList200ResponseItemsInnerStatusEnum? status) =>
      _$this._status = status;

  String? _method;
  String? get method => _$this._method;
  set method(String? method) => _$this._method = method;

  String? _provider;
  String? get provider => _$this._provider;
  set provider(String? provider) => _$this._provider = provider;

  String? _externalId;
  String? get externalId => _$this._externalId;
  set externalId(String? externalId) => _$this._externalId = externalId;

  DateTime? _createdAt;
  DateTime? get createdAt => _$this._createdAt;
  set createdAt(DateTime? createdAt) => _$this._createdAt = createdAt;

  DateTime? _updatedAt;
  DateTime? get updatedAt => _$this._updatedAt;
  set updatedAt(DateTime? updatedAt) => _$this._updatedAt = updatedAt;

  bool? _isAuthorized;
  bool? get isAuthorized => _$this._isAuthorized;
  set isAuthorized(bool? isAuthorized) => _$this._isAuthorized = isAuthorized;

  bool? _isPaid;
  bool? get isPaid => _$this._isPaid;
  set isPaid(bool? isPaid) => _$this._isPaid = isPaid;

  bool? _isFailed;
  bool? get isFailed => _$this._isFailed;
  set isFailed(bool? isFailed) => _$this._isFailed = isFailed;

  String? _providerDisplay;
  String? get providerDisplay => _$this._providerDisplay;
  set providerDisplay(String? providerDisplay) =>
      _$this._providerDisplay = providerDisplay;

  bool? _capturable;
  bool? get capturable => _$this._capturable;
  set capturable(bool? capturable) => _$this._capturable = capturable;

  PaymentsList200ResponseItemsInnerBuilder() {
    PaymentsList200ResponseItemsInner._defaults(this);
  }

  PaymentsList200ResponseItemsInnerBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _id = $v.id;
      _tripId = $v.tripId;
      _amountUsd = $v.amountUsd;
      _status = $v.status;
      _method = $v.method;
      _provider = $v.provider;
      _externalId = $v.externalId;
      _createdAt = $v.createdAt;
      _updatedAt = $v.updatedAt;
      _isAuthorized = $v.isAuthorized;
      _isPaid = $v.isPaid;
      _isFailed = $v.isFailed;
      _providerDisplay = $v.providerDisplay;
      _capturable = $v.capturable;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(PaymentsList200ResponseItemsInner other) {
    _$v = other as _$PaymentsList200ResponseItemsInner;
  }

  @override
  void update(
      void Function(PaymentsList200ResponseItemsInnerBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  PaymentsList200ResponseItemsInner build() => _build();

  _$PaymentsList200ResponseItemsInner _build() {
    final _$result = _$v ??
        _$PaymentsList200ResponseItemsInner._(
          id: id,
          tripId: tripId,
          amountUsd: amountUsd,
          status: status,
          method: method,
          provider: provider,
          externalId: externalId,
          createdAt: createdAt,
          updatedAt: updatedAt,
          isAuthorized: isAuthorized,
          isPaid: isPaid,
          isFailed: isFailed,
          providerDisplay: providerDisplay,
          capturable: capturable,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
