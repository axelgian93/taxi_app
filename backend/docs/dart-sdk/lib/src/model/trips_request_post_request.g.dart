// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'trips_request_post_request.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$TripsRequestPostRequest extends TripsRequestPostRequest {
  @override
  final OneOf oneOf;

  factory _$TripsRequestPostRequest(
          [void Function(TripsRequestPostRequestBuilder)? updates]) =>
      (TripsRequestPostRequestBuilder()..update(updates))._build();

  _$TripsRequestPostRequest._({required this.oneOf}) : super._();
  @override
  TripsRequestPostRequest rebuild(
          void Function(TripsRequestPostRequestBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  TripsRequestPostRequestBuilder toBuilder() =>
      TripsRequestPostRequestBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is TripsRequestPostRequest && oneOf == other.oneOf;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, oneOf.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'TripsRequestPostRequest')
          ..add('oneOf', oneOf))
        .toString();
  }
}

class TripsRequestPostRequestBuilder
    implements
        Builder<TripsRequestPostRequest, TripsRequestPostRequestBuilder> {
  _$TripsRequestPostRequest? _$v;

  OneOf? _oneOf;
  OneOf? get oneOf => _$this._oneOf;
  set oneOf(OneOf? oneOf) => _$this._oneOf = oneOf;

  TripsRequestPostRequestBuilder() {
    TripsRequestPostRequest._defaults(this);
  }

  TripsRequestPostRequestBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _oneOf = $v.oneOf;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(TripsRequestPostRequest other) {
    _$v = other as _$TripsRequestPostRequest;
  }

  @override
  void update(void Function(TripsRequestPostRequestBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  TripsRequestPostRequest build() => _build();

  _$TripsRequestPostRequest _build() {
    final _$result = _$v ??
        _$TripsRequestPostRequest._(
          oneOf: BuiltValueNullFieldError.checkNotNull(
              oneOf, r'TripsRequestPostRequest', 'oneOf'),
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
