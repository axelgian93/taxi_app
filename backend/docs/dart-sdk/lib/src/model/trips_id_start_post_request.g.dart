// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'trips_id_start_post_request.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

const TripsIdStartPostRequestMethodEnum
    _$tripsIdStartPostRequestMethodEnum_CASH =
    const TripsIdStartPostRequestMethodEnum._('CASH');
const TripsIdStartPostRequestMethodEnum
    _$tripsIdStartPostRequestMethodEnum_CARD =
    const TripsIdStartPostRequestMethodEnum._('CARD');
const TripsIdStartPostRequestMethodEnum
    _$tripsIdStartPostRequestMethodEnum_TRANSFER =
    const TripsIdStartPostRequestMethodEnum._('TRANSFER');

TripsIdStartPostRequestMethodEnum _$tripsIdStartPostRequestMethodEnumValueOf(
    String name) {
  switch (name) {
    case 'CASH':
      return _$tripsIdStartPostRequestMethodEnum_CASH;
    case 'CARD':
      return _$tripsIdStartPostRequestMethodEnum_CARD;
    case 'TRANSFER':
      return _$tripsIdStartPostRequestMethodEnum_TRANSFER;
    default:
      throw ArgumentError(name);
  }
}

final BuiltSet<TripsIdStartPostRequestMethodEnum>
    _$tripsIdStartPostRequestMethodEnumValues = BuiltSet<
        TripsIdStartPostRequestMethodEnum>(const <TripsIdStartPostRequestMethodEnum>[
  _$tripsIdStartPostRequestMethodEnum_CASH,
  _$tripsIdStartPostRequestMethodEnum_CARD,
  _$tripsIdStartPostRequestMethodEnum_TRANSFER,
]);

Serializer<TripsIdStartPostRequestMethodEnum>
    _$tripsIdStartPostRequestMethodEnumSerializer =
    _$TripsIdStartPostRequestMethodEnumSerializer();

class _$TripsIdStartPostRequestMethodEnumSerializer
    implements PrimitiveSerializer<TripsIdStartPostRequestMethodEnum> {
  static const Map<String, Object> _toWire = const <String, Object>{
    'CASH': 'CASH',
    'CARD': 'CARD',
    'TRANSFER': 'TRANSFER',
  };
  static const Map<Object, String> _fromWire = const <Object, String>{
    'CASH': 'CASH',
    'CARD': 'CARD',
    'TRANSFER': 'TRANSFER',
  };

  @override
  final Iterable<Type> types = const <Type>[TripsIdStartPostRequestMethodEnum];
  @override
  final String wireName = 'TripsIdStartPostRequestMethodEnum';

  @override
  Object serialize(
          Serializers serializers, TripsIdStartPostRequestMethodEnum object,
          {FullType specifiedType = FullType.unspecified}) =>
      _toWire[object.name] ?? object.name;

  @override
  TripsIdStartPostRequestMethodEnum deserialize(
          Serializers serializers, Object serialized,
          {FullType specifiedType = FullType.unspecified}) =>
      TripsIdStartPostRequestMethodEnum.valueOf(
          _fromWire[serialized] ?? (serialized is String ? serialized : ''));
}

class _$TripsIdStartPostRequest extends TripsIdStartPostRequest {
  @override
  final TripsIdStartPostRequestMethodEnum? method;

  factory _$TripsIdStartPostRequest(
          [void Function(TripsIdStartPostRequestBuilder)? updates]) =>
      (TripsIdStartPostRequestBuilder()..update(updates))._build();

  _$TripsIdStartPostRequest._({this.method}) : super._();
  @override
  TripsIdStartPostRequest rebuild(
          void Function(TripsIdStartPostRequestBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  TripsIdStartPostRequestBuilder toBuilder() =>
      TripsIdStartPostRequestBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is TripsIdStartPostRequest && method == other.method;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, method.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'TripsIdStartPostRequest')
          ..add('method', method))
        .toString();
  }
}

class TripsIdStartPostRequestBuilder
    implements
        Builder<TripsIdStartPostRequest, TripsIdStartPostRequestBuilder> {
  _$TripsIdStartPostRequest? _$v;

  TripsIdStartPostRequestMethodEnum? _method;
  TripsIdStartPostRequestMethodEnum? get method => _$this._method;
  set method(TripsIdStartPostRequestMethodEnum? method) =>
      _$this._method = method;

  TripsIdStartPostRequestBuilder() {
    TripsIdStartPostRequest._defaults(this);
  }

  TripsIdStartPostRequestBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _method = $v.method;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(TripsIdStartPostRequest other) {
    _$v = other as _$TripsIdStartPostRequest;
  }

  @override
  void update(void Function(TripsIdStartPostRequestBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  TripsIdStartPostRequest build() => _build();

  _$TripsIdStartPostRequest _build() {
    final _$result = _$v ??
        _$TripsIdStartPostRequest._(
          method: method,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
